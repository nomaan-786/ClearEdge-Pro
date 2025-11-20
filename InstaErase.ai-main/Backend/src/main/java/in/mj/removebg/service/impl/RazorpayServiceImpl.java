package in.mj.removebg.service.impl;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import in.mj.removebg.dto.UserDTO;
import in.mj.removebg.entity.OrderEntity;
import in.mj.removebg.repository.OrderRepository;
import in.mj.removebg.service.RazorpayService;
import in.mj.removebg.service.UserService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl implements RazorpayService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    private final OrderRepository orderRepository;
    private final UserService userService;

    @Override
    public Order createOrder(Double amount, String currency) throws RazorpayException {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount * 100); // amount in paise
            orderRequest.put("currency", currency);
            orderRequest.put("receipt", "order_rcptid_" + System.currentTimeMillis());
            orderRequest.put("payment_capture", 1);

            return razorpayClient.orders.create(orderRequest);
        } catch (RazorpayException e) {
            throw new RazorpayException("Razorpay error: " + e.getMessage(), e);
        }
    }

    @Override
    public Map<String, Object> verifyPayment(String razorpayOrderId) throws RazorpayException {
        Map<String, Object> returnValue = new HashMap<>();
        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            Order orderInfo = razorpayClient.orders.fetch(razorpayOrderId);

            if ("paid".equalsIgnoreCase(orderInfo.get("status").toString())) {
                OrderEntity existingOrder = orderRepository.findByOrderId(razorpayOrderId)
                        .orElseThrow(() -> new RuntimeException("Order not found: " + razorpayOrderId));

                if (existingOrder.getPayment()) {
                    returnValue.put("success","false");
                    returnValue.put("message", "Payment Failed");
                    return returnValue;
                }

                UserDTO userDTO = userService.getUserByClerkId(existingOrder.getClerkId());
                userDTO.setCredits(userDTO.getCredits() + existingOrder.getCredits());
                userService.saveUser(userDTO);

                existingOrder.setPayment(true);
                orderRepository.save(existingOrder);
                returnValue.put("success","true");
                returnValue.put("message", "Credits Added");
                return returnValue;
            }
        } catch (RazorpayException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error While Verifying the payment", e);
        }
        return returnValue;
    }
}

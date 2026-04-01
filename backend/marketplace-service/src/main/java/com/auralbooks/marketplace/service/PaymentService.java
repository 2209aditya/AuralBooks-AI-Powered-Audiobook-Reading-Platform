package com.auralbooks.marketplace.service;

import com.auralbooks.marketplace.domain.Order;
import com.auralbooks.marketplace.domain.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final OrderRepository repository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    private static final String TOPIC = "auralbooks-events";

    public Order createOrder(Long userId, Long bookId, Double amount) {

        Order order = Order.builder()
                .userId(userId)
                .bookId(bookId)
                .amount(amount)
                .status("CREATED")
                .build();

        return repository.save(order);
    }

    public String initiatePayment(Long orderId) {
        // simulate payment gateway call
        Order order = repository.findById(orderId).orElseThrow();

        String paymentId = "PAY-" + System.currentTimeMillis();

        order.setPaymentId(paymentId);
        repository.save(order);

        return paymentId;
    }

    public void handlePaymentSuccess(String paymentId) {
        Order order = repository.findAll().stream()
                .filter(o -> paymentId.equals(o.getPaymentId()))
                .findFirst()
                .orElseThrow();

        order.setStatus("PAID");
        repository.save(order);

        // publish event
        kafkaTemplate.send(TOPIC, "PAYMENT_SUCCESS:" + order.getId());
    }
}
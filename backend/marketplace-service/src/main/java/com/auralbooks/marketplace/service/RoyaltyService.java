package com.auralbooks.marketplace.controller;

import com.auralbooks.marketplace.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/webhook")
@RequiredArgsConstructor
public class WebhookController {

    private final PaymentService paymentService;

    @PostMapping("/payment-success")
    public String paymentSuccess(@RequestParam String paymentId) {

        paymentService.handlePaymentSuccess(paymentId);

        return "OK";
    }
}
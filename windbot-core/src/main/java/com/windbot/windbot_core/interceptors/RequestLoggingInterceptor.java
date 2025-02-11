package com.windbot.windbot_core.interceptors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class RequestLoggingInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(RequestLoggingInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String requestDetails = buildRequestDetails(request);
        logger.info("Incoming Request: {}", requestDetails);
        request.setAttribute("startTime", System.currentTimeMillis());
        return true;
    }



    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        long startTime = (Long) request.getAttribute("startTime");
        long duration = System.currentTimeMillis() - startTime;

        String responseDetails = buildResponseDetails(request, response, duration);
        logger.info("Completed Request: {}", responseDetails);

        if (ex != null) {
            logger.error("Request failed with exception: ", ex);
        }
    }

    private String buildRequestDetails(HttpServletRequest request) {
        StringBuilder details = new StringBuilder();
        details.append("\n");
        details.append("Method: ").append(request.getMethod()).append("\n");
        details.append("URI: ").append(request.getRequestURI()).append("\n");
        details.append("Query: ").append(request.getQueryString() != null ? request.getQueryString() : "").append("\n");
        details.append("Client IP: ").append(request.getRemoteAddr()).append("\n");
        details.append("Headers: ").append("\n");
        Collections.list(request.getHeaderNames()).forEach(headerName ->
                details.append("  ").append(headerName).append(": ")
                        .append(request.getHeader(headerName)).append("\n")
        );

        String parameters = request.getParameterMap().entrySet().stream()
                .map(entry -> entry.getKey() + "=" + String.join(",", entry.getValue()))
                .collect(Collectors.joining(", "));

        if (!parameters.isEmpty()) {
            details.append("Parameters: ").append(parameters);
        }

        return details.toString();
    }

    private String buildResponseDetails(HttpServletRequest request, HttpServletResponse response, long duration) {
        StringBuilder details = new StringBuilder();
        details.append("\n");
        details.append("Method: ").append(request.getMethod()).append("\n");
        details.append("URI: ").append(request.getRequestURI()).append("\n");
        details.append("Status: ").append(response.getStatus()).append("\n");
        details.append("Duration: ").append(duration).append("ms").append("\n");
        details.append("Response Headers: ").append("\n");

        response.getHeaderNames().forEach(headerName ->
                details.append("  ").append(headerName).append(": ")
                        .append(response.getHeader(headerName)).append("\n")
        );

        return details.toString();
    }
}

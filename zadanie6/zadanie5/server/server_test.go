package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHandleProducts(t *testing.T) {
	req, err := http.NewRequest("GET", "/products", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handleProducts)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	var products []Product
	if err := json.Unmarshal(rr.Body.Bytes(), &products); err != nil {
		t.Errorf("failed to decode JSON response: %v", err)
	}

	expected := []Product{
		{1, "Taśma", 5},
		{2, "Klej", 4},
		{3, "Papier a4", 15},
	}

	if !compareProducts(products, expected) {
		t.Errorf("handler returned unexpected body: got %v want %v",
			products, expected)
	}
}

func TestHandleProductsInvalidEndpoint(t *testing.T) {
	req, err := http.NewRequest("GET", "/invalid", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handleProducts)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusNotFound {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusNotFound)
	}
}

func TestHandlePayments(t *testing.T) {
	payment := Payment{
		Name:           "John Doe",
		CardNumber:     "1234567890123456",
		ExpirationDate: "12/24",
		CVV:            "123",
	}

	payload, err := json.Marshal(payment)
	if err != nil {
		t.Fatal(err)
	}

	req, err := http.NewRequest("POST", "/payments", bytes.NewBuffer(payload))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handlePayments)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	var responseData map[string]string
	if err := json.NewDecoder(rr.Body).Decode(&responseData); err != nil {
		t.Errorf("failed to decode JSON response: %v", err)
		return
	}

	expectedMessage := "Payment processed successfully"
	expectedData := fmt.Sprintf("{Name:%s CardNumber:%s ExpirationDate:%s CVV:%s}",
		payment.Name, payment.CardNumber, payment.ExpirationDate, payment.CVV)
	if responseData["message"] != expectedMessage || responseData["data"] != expectedData {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), map[string]string{"message": expectedMessage, "data": expectedData})
	}
}

func compareProducts(products1, products2 []Product) bool {
	if len(products1) != len(products2) {
		return false
	}

	for i := range products1 {
		if products1[i] != products2[i] {
			return false
		}
	}

	return true
}

package models

import "gorm.io/gorm"

type BasketItem struct {
	gorm.Model
	Name      string `json:"name"`
	ProductID int    `json:"productID"`
	Amount    int    `json:"amount"`
}

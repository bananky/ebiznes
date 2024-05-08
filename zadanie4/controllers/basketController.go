package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	"zadanie4/models"
)

func AddToBasket(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	item := new(models.BasketItem)
	if err := c.Bind(item); err != nil {
		return err
	}

	db.Create(item)
	return c.JSON(http.StatusCreated, item)
}

func GetBasketItems(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var items []models.BasketItem
	db.Find(&items)
	return c.JSON(http.StatusOK, items)
}

func GetBasketItem(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	id, _ := strconv.Atoi(c.Param("id"))
	var item models.BasketItem
	if err := db.First(&item, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Item not found")
	}
	return c.JSON(http.StatusOK, item)
}

func UpdateBasketItem(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	id, _ := strconv.Atoi(c.Param("id"))
	var item models.BasketItem
	if err := db.First(&item, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Item not found")
	}

	if err := c.Bind(&item); err != nil {
		return err
	}

	db.Save(&item)
	return c.JSON(http.StatusOK, item)
}

func DeleteFromBasket(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	id, _ := strconv.Atoi(c.Param("id"))
	var item models.BasketItem
	if err := db.First(&item, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Item not found")
	}

	db.Delete(&item)
	return c.NoContent(http.StatusNoContent)
}

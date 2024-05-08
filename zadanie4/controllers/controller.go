package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	"zadanie4/models"
)

func Create(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		return err
	}

	db.Create(product)
	return c.JSON(http.StatusCreated, product)
}

func ReadAll(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var products []models.Product
	db.Find(&products)
	return c.JSON(http.StatusOK, products)
}

func Read(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	id, _ := strconv.Atoi(c.Param("id"))
	var product models.Product
	if err := db.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Product not found")
	}
	return c.JSON(http.StatusOK, product)
}

func Update(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	id, _ := strconv.Atoi(c.Param("id"))
	var product models.Product
	if err := db.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	if err := c.Bind(&product); err != nil {
		return err
	}

	db.Save(&product)
	return c.JSON(http.StatusOK, product)
}

func Delete(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	id, _ := strconv.Atoi(c.Param("id"))
	var product models.Product
	if err := db.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	db.Delete(&product)
	return c.NoContent(http.StatusNoContent)
}

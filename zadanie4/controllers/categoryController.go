package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	"zadanie4/models"
)

func CreateCategory(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	category := new(models.Category)
	if err := c.Bind(category); err != nil {
		return err
	}

	db.Create(category)
	return c.JSON(http.StatusCreated, category)
}

func ReadAllCategories(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var categories []models.Category
	db.Preload("Products").Find(&categories)
	return c.JSON(http.StatusOK, categories)
}

func ReadCategory(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	id, _ := strconv.Atoi(c.Param("id"))
	var category models.Category
	if err := db.Preload("Products").First(&category, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Category not found")
	}
	return c.JSON(http.StatusOK, category)
}

func UpdateCategory(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	id, _ := strconv.Atoi(c.Param("id"))
	var category models.Category
	if err := db.First(&category, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Category not found")
	}

	if err := c.Bind(&category); err != nil {
		return err
	}

	db.Save(&category)
	return c.JSON(http.StatusOK, category)
}

func DeleteCategory(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	id, _ := strconv.Atoi(c.Param("id"))
	var category models.Category
	if err := db.First(&category, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Category not found")
	}

	db.Delete(&category)
	return c.NoContent(http.StatusNoContent)
}

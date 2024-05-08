package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float32 `json:"price"`
}

var products = map[int]Product{
	1: {ID: 1, Name: "taśma", Price: 4.99},
	2: {ID: 2, Name: "klej", Price: 3.99},
	3: {ID: 3, Name: "papier a4", Price: 29.99},
}

func Create(c echo.Context) error {
	product := new(Product)
	if err := c.Bind(product); err != nil {
		return err
	}

	id := len(products) + 1
	product.ID = id
	products[id] = *product

	return c.JSON(http.StatusCreated, product)
}

func ReadAll(c echo.Context) error {
	return c.JSON(http.StatusOK, products)
}

func Read(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	product, ok := products[id]
	if !ok {
		return c.JSON(http.StatusNotFound, "Product not found")
	}
	return c.JSON(http.StatusOK, product)
}

func Update(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	product, ok := products[id]
	if !ok {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	if err := c.Bind(&product); err != nil {
		return err
	}

	products[id] = product
	return c.JSON(http.StatusOK, product)
}

func Delete(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	_, ok := products[id]
	if !ok {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	delete(products, id)
	return c.NoContent(http.StatusNoContent)
}

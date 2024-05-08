package main

import (
	"zadanie4/controllers"
	"zadanie4/models"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("baza.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}

	db.AutoMigrate(&models.Product{}, &models.BasketItem{}, &models.Category{})

	e := echo.New()

	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("db", db)
			return next(c)
		}
	})

	e.POST("/products", controllers.Create)
	e.GET("/products", controllers.ReadAll)
	e.GET("/products/:id", controllers.Read)
	e.PUT("/products/:id", controllers.Update)
	e.DELETE("/products/:id", controllers.Delete)

	e.POST("/basket", controllers.AddToBasket)
	e.GET("/basket", controllers.GetBasketItems)
	e.GET("/basket/:id", controllers.GetBasketItem)
	e.PUT("/basket/:id", controllers.UpdateBasketItem)
	e.DELETE("/basket/:id", controllers.DeleteFromBasket)

	e.POST("/categories", controllers.CreateCategory)
	e.GET("/categories", controllers.ReadAllCategories)
	e.GET("/categories/:id", controllers.ReadCategory)
	e.PUT("/categories/:id", controllers.UpdateCategory)
	e.DELETE("/categories/:id", controllers.DeleteCategory)

	e.Logger.Fatal(e.Start(":3000"))
}

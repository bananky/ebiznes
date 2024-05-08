package main

import (
	"zadanie4/controllers"
	"zadanie4/models"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("products.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}

	db.AutoMigrate(&models.Product{})

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

	e.Logger.Fatal(e.Start(":3000"))
}

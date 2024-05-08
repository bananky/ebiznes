package main

import (
	"zadanie4/controllers"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.POST("/products", controllers.Create)
	e.GET("/products", controllers.ReadAll)
	e.GET("/products/:id", controllers.Read)
	e.PUT("/products/:id", controllers.Update)
	e.DELETE("/products/:id", controllers.Delete)
	e.Logger.Fatal(e.Start(":3000"))
}

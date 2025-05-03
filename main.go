package main

import (
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./ajax")))

	println("Server started at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
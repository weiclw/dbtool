package main

import (
	"net/http"
)

func main() {
	http.Handle("/ajax/", http.StripPrefix("/ajax/", http.FileServer(http.Dir("./ajax"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))

	println("Server started at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
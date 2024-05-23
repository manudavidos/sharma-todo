package router

import (
	"github.com/manudavidos/sharma-todo/middleware"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	const apiPath string = "/api/tasks"

	router := mux.NewRouter()
	router.HandleFunc(apiPath, middleware.GetAllTasks).Methods("GET", "OPTIONS")
	router.HandleFunc(apiPath, middleware.CreateTask).Methods("POST", "OPTIONS")
	router.HandleFunc(apiPath+"/complete/{id}", middleware.CompleteTask).Methods("PUT", "OPTIONS")
	router.HandleFunc(apiPath+"/undo/{id}", middleware.UndoTask).Methods("PUT", "OPTIONS")
	router.HandleFunc(apiPath+"/delete/{id}", middleware.DeleteTask).Methods("DELETE", "OPTIONS")
	router.HandleFunc(apiPath+"/reset", middleware.Reset).Methods("DELETE", "OPTIONS")
	return router
}

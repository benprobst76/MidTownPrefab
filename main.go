package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
)

type Cred struct {
	User     string `json:"user"`
	Password string `json:"password"`
}
type Cfo struct {
	Time       string   `json:"time"`
	CheckTime  string   `json:"checktime"`
	User       string   `json:"user"`
	Worksite   string   `json:"worksite"`
	Floor      string   `json:"floor"`
	Unit       string   `json:"unit"`
	Type       string   `json:"type"`
	Part       string   `json:"part"`
	Side       string   `json:"side"`
	Thickness  string   `json:"thickness"`
	Width      string   `json:"Width"`
	Length     string   `json:"length"`
	Length2    string   `json:"length2"`
	DA         string   `json:"dA"`
	DB         string   `json:"dB"`
	DC         string   `json:"dC"`
	DD         string   `json:"dD"`
	DE         string   `json:"dE"`
	D1A        string   `json:"d1A"`
	D2A        string   `json:"d2A"`
	D1B        string   `json:"d1B"`
	D2B        string   `json:"d2B"`
	DR         string   `json:"dR"`
	DR_P       string   `json:"dR_P"`
	DH         string   `json:"dH"`
	DW         string   `json:"dW"`
	Edge1      string   `json:"edgeA"`
	Edge2      string   `json:"edgeB"`
	Price      string   `json:"price"`
	Check      string   `json:"check"`
	Rand       string   `json:"rand"`
	Sum        string   `json:"sum"`
	Order      string   `json:"order"`
	Order2     string   `json:"order2"`
	UniqueID   string   `json:"uniqueID"`
	UniqueID2  string   `json:"uniqueID2"`
	UniqueIDQR string   `json:"uniqueIDQR"`
	Sheet      string   `json:"sheet"`
	Img        []string `json:"img"`
	GroupO     string   `json:"groupO"`
	Priority   string   `json:"priority"`
	Note       string   `json:"note"`
}
type Work struct {
	Worksite string `json:"worksite"`
}
type Flor2 struct {
	Floor string `json:"floor"`
}
type Unt2 struct {
	Unit string `json:"unit"`
}
type Loca struct {
	Worksite string `json:"worksite"`
	Floor    string `json:"floor"`
}
type Loca2 struct {
	Worksite string `json:"worksite"`
	Floor    string `json:"floor"`
	Unit     string `json:"unit"`
}
type Pgrs2 struct {
	Unit     string `json:"unit"`
	Progress string `json:"progress"`
	Rand     string `json:"rand"`
	Parts    string `json:"parts"`
}
type Prst struct {
	Work   string   `json:"work"`
	Sort   string   `json:"sort"`
	Constr []string `json:"constr"`
	Nbr    string   `json:"nbr"`
	Name   string   `json:"name"`
}
type DB struct {
	User string `json:"user"`
	Prst []Prst
}

var Cinfo Cfo
var hisM []Cfo
var progressItems []Pgrs2
var sheetCounter int
var fileMutexO = &sync.Mutex{}
var fileMutexH = &sync.Mutex{}
var fileMutexW = &sync.Mutex{}
var fileMutexF = &sync.Mutex{}
var fileMutexU = &sync.Mutex{}
var logFile, _ = os.OpenFile("errors.log", os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0666)
var logger = log.New(logFile, "ERROR: ", log.LstdFlags|log.Lshortfile)

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func loadCred() ([]Cred, []Cred, []Cred) {
	var order_login []Cred
	file, err := os.Open("json/order_login.json")
	if err != nil {
		logger.Println(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&order_login); err != nil {
		logger.Println(err)
	}
	file.Close()
	var receive_login []Cred
	file, err = os.Open("json/receive_login.json")
	if err != nil {
		if os.IsNotExist(err) {
			receive_login = []Cred{}
		}
		logger.Println(err)
	}
	decoder = json.NewDecoder(file)
	if err := decoder.Decode(&receive_login); err != nil {
		logger.Println(err)
	}
	file.Close()
	var admin_login []Cred
	file, err = os.Open("json/admin_login.json")
	if err != nil {
		if os.IsNotExist(err) {
			admin_login = []Cred{}
		}
		logger.Println(err)
	}
	decoder = json.NewDecoder(file)
	if err := decoder.Decode(&admin_login); err != nil {
		logger.Println(err)
	}
	file.Close()
	return order_login, receive_login, admin_login
}

// ______________________________________________________________________________________________________________
func home(c *gin.Context) {
	data1, err := os.ReadFile("loginPage/head.html")
	if err != nil {
		logger.Println(err)
		return
	}
	data2, err := os.ReadFile("loginPage/body.html")
	if err != nil {
		logger.Println(err)
		return
	}
	data3, err := os.ReadFile("loginPage/script.js")
	if err != nil {
		logger.Println(err)
		return
	}
	full := "<!DOCTYPE html><html>" + string(data1) + string(data2) + "<script>" + string(data3) + "</script>" + "</html>"
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, full)
}

// ______________________________________________________________________________________________________________
func login98(c *gin.Context) {
	data1, err := os.ReadFile("loginPage/body.html")
	if err != nil {
		logger.Println(err)
		return
	}
	data2, err := os.ReadFile("loginPage/head.html")
	if err != nil {
		logger.Println(err)
		return
	}
	data3, err := os.ReadFile("loginPage/script.js")
	if err != nil {
		logger.Println(err)
		return
	}
	c.JSON(http.StatusOK, []string{string(data1), string(data2), string(data3)})
}

// ______________________________________________________________________________________________________________
func login(c *gin.Context) {
	order_login, receive_login, admin_login := loadCred()
	var password Cred
	if err := c.BindJSON(&password); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	for _, cred := range order_login {
		if cred.User == password.User && cred.Password == password.Password {
			c.SetCookie("username4221", password.User, 0, "/", "", false, false)
			data1, err := os.ReadFile("orderPage/body.html")
			if err != nil {
				logger.Println(err)
				return
			}
			data2, err := os.ReadFile("orderPage/head.html")
			if err != nil {
				logger.Println(err)
				return
			}
			data3, err := os.ReadFile("orderPage/script.js")
			if err != nil {
				logger.Println(err)
				return
			}
			c.JSON(http.StatusOK, []string{string(data1), string(data2), string(data3), "/loginOrder"})
			return
		}
	}
	for _, cred := range receive_login {
		if cred.User == password.User && cred.Password == password.Password {
			c.SetCookie("username7834", password.User, 0, "/", "", false, false)
			data1, err := os.ReadFile("receivePage/body.html")
			if err != nil {
				logger.Println(err)
				return
			}
			data2, err := os.ReadFile("receivePage/head.html")
			if err != nil {
				logger.Println(err)
				return
			}
			data3, err := os.ReadFile("receivePage/script.js")
			if err != nil {
				logger.Println(err)
				return
			}
			c.JSON(http.StatusOK, []string{string(data1), string(data2), string(data3), "/loginReceiver"})
			return
		}
	}
	for _, cred := range admin_login {
		if cred.User == password.User && cred.Password == password.Password {
			c.SetCookie("username0623", password.User, 0, "/", "", false, false)
			data1, err := os.ReadFile("adminPage/body.html")
			if err != nil {
				logger.Println(err)
				return
			}
			data2, err := os.ReadFile("adminPage/head.html")
			if err != nil {
				logger.Println(err)
				return
			}
			data3, err := os.ReadFile("adminPage/script.js")
			if err != nil {
				logger.Println(err)
				return
			}
			c.JSON(http.StatusOK, []string{string(data1), string(data2), string(data3), "/loginAdmin"})
			return
		}
	}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func loginOrder(c *gin.Context) {
	data1, err := os.ReadFile("orderPage/head.html")
	if err != nil {
		logger.Println(err)
		return
	}
	data2, err := os.ReadFile("orderPage/body.html")
	if err != nil {
		logger.Println(err)
		return
	}
	data3, err := os.ReadFile("orderPage/script.js")
	if err != nil {
		logger.Println(err)
		return
	}
	full := "<!DOCTYPE html><html>" + string(data1) + "<script src=\"https://unpkg.com/htmx.org@1.9.10\"></script>" + string(data2) + "<script>" + string(data3) + "</script>" + "</html>"
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, full)
}

// ______________________________________________________________________________________________________________
func loginReceiver(c *gin.Context) {
	data1, err := os.ReadFile("receivePage/head.html")
	if err != nil {
		logger.Println(err)
		return
	}
	data2, err := os.ReadFile("receivePage/body.html")
	if err != nil {
		logger.Println(err)
		return
	}
	data3, err := os.ReadFile("receivePage/script.js")
	if err != nil {
		logger.Println(err)
		return
	}
	full := "<!DOCTYPE html><html>" + string(data1) + string(data2) + "<script>" + string(data3) + "</script>" + "</html>"
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, full)
}

// ______________________________________________________________________________________________________________
func loginAdmin(c *gin.Context) {
	data, err := os.ReadFile("adminPage/adminPanel.html")
	if err != nil {
		logger.Println(err)
		return
	}
	worksite_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, worksite_page)
}

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func getUser(c *gin.Context) {
	order_login, _, _ := loadCred()
	c.JSON(http.StatusOK, gin.H{"inputs": order_login})
}

// ______________________________________________________________________________________________________________
func getUser2(c *gin.Context) {
	_, receive_login, _ := loadCred()
	c.JSON(http.StatusOK, gin.H{"items": receive_login})
}

// ______________________________________________________________________________________________________________
func addUser(c *gin.Context) {
	order_login, receive_login, _ := loadCred()
	var nUsr Cred
	if err := c.ShouldBindJSON(&nUsr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	trySplit := strings.Split(nUsr.User, "_2zekbv2")
	if len(trySplit) > 1 {
		nUsr.User = trySplit[0]
		receive_login = append(receive_login, nUsr)
		files := "json/receive_login.json"
		file, err := os.Create(files)
		if err != nil {
			logger.Println(err)
		}
		encoder := json.NewEncoder(file)
		if err := encoder.Encode(receive_login); err != nil {
			logger.Println(err)
		}
		file.Close()
	} else {
		order_login = append(order_login, nUsr)
		files := "json/order_login.json"
		file, err := os.Create(files)
		if err != nil {
			logger.Println(err)
		}
		encoder := json.NewEncoder(file)
		if err := encoder.Encode(order_login); err != nil {
			logger.Println(err)
		}
		file.Close()
	}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func delUser(c *gin.Context) {
	order_login, receive_login, _ := loadCred()
	var goodLogin []Cred
	var files string
	var dUsr Cred
	if err := c.BindJSON(&dUsr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	trySplit := strings.Split(dUsr.User, "_2zekbv2")
	if len(trySplit) > 1 {
		files = "json/receive_login.json"
		goodLogin = receive_login
	} else {
		files = "json/order_login.json"
		goodLogin = order_login
	}
	for i, item := range goodLogin {
		if item.User == dUsr.User {
			goodLogin = append(goodLogin[:i], goodLogin[i+1:]...)
			break
		}
	}
	file, err := os.Create(files)
	if err != nil {
		logger.Println(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(goodLogin); err != nil {
		logger.Println(err)
	}
	file.Close()
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func openWork() []Work {
	fileMutexO.Lock()
	defer fileMutexO.Unlock()
	var worksites []Work
	file, err := os.Open("json/worksites.json")
	if err != nil {
		logger.Println(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&worksites); err != nil {
		logger.Println(err)
	}
	file.Close()
	return worksites
}

// ______________________________________________________________________________________________________________
func getWorksites(c *gin.Context) {
	worksites := openWork()
	c.JSON(http.StatusOK, gin.H{"worksites": worksites})
}

// ______________________________________________________________________________________________________________
func addWorksite(c *gin.Context) {
	worksites := openWork()
	var nWork Work
	if err := c.ShouldBindJSON(&nWork); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	tt := []Flor2{}
	worksites = append(worksites, nWork)
	files := "json/" + nWork.Worksite + "_floors.json"
	file, err := os.Create(files)
	if err != nil {
		logger.Println(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(tt); err != nil {
		logger.Println(err)
	}
	file.Close()
	saveWorksite(worksites)
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func saveWorksite(worksites []Work) {
	fileMutexW.Lock()
	defer fileMutexW.Unlock()
	file, err := os.Create("json/worksites.json")
	if err != nil {
		logger.Println(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(worksites); err != nil {
		logger.Println(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func delWorksite(c *gin.Context) {
	worksites := openWork()
	var dWork Work
	if err := c.BindJSON(&dWork); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	for i, item := range worksites {
		if item.Worksite == dWork.Worksite {
			worksites = append(worksites[:i], worksites[i+1:]...)
			break
		}
	}
	files := "json/" + dWork.Worksite + "_floors.json"
	fmt.Println(files)
	err := os.Remove(files)
	if err != nil {
		logger.Println(err)
		return
	}
	saveWorksite(worksites)
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func editWorksite(c *gin.Context) {
	worksites := openWork()
	type Work2 struct {
		OldWorksite string `json:"oldWorksite"`
		Worksite    string `json:"worksite"`
	}
	var EditW Work2
	if err := c.BindJSON(&EditW); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	newWorksite := Work{
		Worksite: EditW.Worksite,
	}
	for i, item := range worksites {
		if item.Worksite == EditW.OldWorksite {
			worksites[i] = newWorksite
			break
		}
	}
	oldName := "json/" + EditW.OldWorksite + "_floors.json"
	newName := "json/" + EditW.Worksite + "_floors.json"
	fmt.Println(oldName)
	fmt.Println(newName)
	err := os.Rename(oldName, newName)
	if err != nil {
		logger.Println(err)
		return
	}
	saveWorksite(worksites)
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func openFloor(worksite string) []Flor2 {
	fileMutexF.Lock()
	defer fileMutexF.Unlock()
	var floors []Flor2
	files := "json/" + worksite + "_floors.json"
	file, err := os.Open(files)
	if err != nil {
		if os.IsNotExist(err) {
			floors = []Flor2{}
		}
		logger.Println(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&floors); err != nil {
		logger.Println(err)
	}
	file.Close()
	return floors
}

// ______________________________________________________________________________________________________________
func getFloors(c *gin.Context) {
	var worksite Work
	if err := c.BindJSON(&worksite); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	floors := openFloor(worksite.Worksite)
	c.JSON(http.StatusOK, gin.H{"floors": floors})
}

// ______________________________________________________________________________________________________________
func saveFloor(worksite string, floors []Flor2) {
	fileMutexF.Lock()
	defer fileMutexF.Unlock()
	files := "json/" + worksite + "_floors.json"
	file, err := os.Create(files)
	if err != nil {
		logger.Println(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(floors); err != nil {
		logger.Println(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func addFloor(c *gin.Context) {
	var nFloor Loca
	if err := c.ShouldBindJSON(&nFloor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	floors := openFloor(nFloor.Worksite)
	nFloor2 := Flor2{
		Floor: nFloor.Floor,
	}
	floors = append(floors, nFloor2)
	tt := []Unt2{}
	files := "json/" + nFloor.Worksite + "_" + nFloor.Floor + "_units.json"
	file, err := os.Create(files)
	if err != nil {
		logger.Println(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(tt); err != nil {
		logger.Println(err)
	}
	file.Close()
	saveFloor(nFloor.Worksite, floors)
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func delFloor(c *gin.Context) {
	var dFloor Loca
	if err := c.BindJSON(&dFloor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	floors := openFloor(dFloor.Worksite)
	orders := openO()
	for _, item := range orders {
		if item.Floor == dFloor.Floor {
			c.String(200, "no")
			return
		}
	}
	for i, item := range floors {
		if item.Floor == dFloor.Floor {
			floors = append(floors[:i], floors[i+1:]...)
			break
		}
	}
	files := "json/" + dFloor.Worksite + "_" + dFloor.Floor + "_units.json"
	err := os.Remove(files)
	if err != nil {
		logger.Println(err)
		return
	}
	saveFloor(dFloor.Worksite, floors)
	c.String(200, "ok")
}

// ______________________________________________________________________________________________________________
func editFloor(c *gin.Context) {
	type Flor3 struct {
		Worksite string `json:"worksite"`
		OldFloor string `json:"oldFloor"`
		Floor    string `json:"floor"`
	}
	var EditF Flor3
	if err := c.BindJSON(&EditF); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	floors := openFloor(EditF.Worksite)
	newFloor := Flor2{
		Floor: EditF.Floor,
	}
	for i, item := range floors {
		if item.Floor == EditF.OldFloor {
			floors[i] = newFloor
			break
		}
	}
	oldName := "json/" + EditF.Worksite + "_" + EditF.OldFloor + "_units.json"
	newName := "json/" + EditF.Worksite + "_" + EditF.Floor + "_units.json"
	err := os.Rename(oldName, newName)
	if err != nil {
		logger.Println(err)
		return
	}
	saveFloor(EditF.Worksite, floors)
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func openUnit(location Loca) []Unt2 {
	fileMutexU.Lock()
	defer fileMutexU.Unlock()
	var units []Unt2
	files := "json/" + location.Worksite + "_" + location.Floor + "_units.json"
	file, err := os.Open(files)
	if err != nil {
		if os.IsNotExist(err) {
			units = []Unt2{}
		}
		logger.Println(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&units); err != nil {
		logger.Println(err)
	}
	file.Close()
	return units
}

// ______________________________________________________________________________________________________________
func getUnits(c *gin.Context) {
	var location Loca
	if err := c.BindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	units := openUnit(location)
	c.JSON(http.StatusOK, gin.H{"units": units})
}

// ______________________________________________________________________________________________________________
func addUnit(c *gin.Context) {
	var nUnit Loca2
	if err := c.ShouldBindJSON(&nUnit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	unitsSend := Loca{
		Worksite: nUnit.Worksite,
		Floor:    nUnit.Floor,
	}
	units := openUnit(unitsSend)
	nUnit2 := Unt2{
		Unit: nUnit.Unit,
	}
	units = append(units, nUnit2)
	saveUnit(unitsSend, units)
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func saveUnit(unitsSend Loca, units []Unt2) {
	fileMutexU.Lock()
	defer fileMutexU.Unlock()
	files := "json/" + unitsSend.Worksite + "_" + unitsSend.Floor + "_units.json"
	file, err := os.Create(files)
	if err != nil {
		logger.Println(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(units); err != nil {
		logger.Println(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func delUnit(c *gin.Context) {
	var dUnit Loca2
	if err := c.BindJSON(&dUnit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	unitsSend := Loca{
		Worksite: dUnit.Worksite,
		Floor:    dUnit.Floor,
	}
	units := openUnit(unitsSend)
	orders := openO()
	for _, item := range orders {
		if item.Unit == dUnit.Unit {
			c.String(200, "no")
			return
		}
	}
	for i, item := range units {
		if item.Unit == dUnit.Unit {
			units = append(units[:i], units[i+1:]...)
			break
		}
	}
	saveUnit(unitsSend, units)
	c.String(200, "ok")
}

// ______________________________________________________________________________________________________________
func editUnit(c *gin.Context) {
	type Unit3 struct {
		Worksite string `json:"worksite"`
		Floor    string `json:"floor"`
		OldUnit  string `json:"oldUnit"`
		Unit     string `json:"unit"`
	}
	var EditU Unit3
	if err := c.BindJSON(&EditU); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	unitsSend := Loca{
		Worksite: EditU.Worksite,
		Floor:    EditU.Floor,
	}
	units := openUnit(unitsSend)
	newUnit := Unt2{
		Unit: EditU.Unit,
	}
	for i, item := range units {
		if item.Unit == EditU.OldUnit {
			units[i] = newUnit
			break
		}
	}
	saveUnit(unitsSend, units)
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func openO() []Cfo {
	fileMutexO.Lock()
	defer fileMutexO.Unlock()
	var orders []Cfo
	file, err := os.Open("json/order.json")
	if err != nil {
		logger.Println(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&orders); err != nil {
		logger.Println(err)
	}
	file.Close()
	return orders
}

// ______________________________________________________________________________________________________________
func saveO(orders []Cfo) {
	fileMutexO.Lock()
	defer fileMutexO.Unlock()
	file, err := os.Create("json/order.json")
	if err != nil {
		logger.Println(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(orders); err != nil {
		logger.Println(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func sendGroup(c *gin.Context) {
	var group []Cfo
	if err := c.BindJSON(&group); err != nil {
		logger.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	orders := openO()
	location, err := time.LoadLocation("America/New_York")
	if err != nil {
		logger.Println(err)
	}
	currentTime := time.Now().In(location)
	for i := range group {
		group[i].Time = fmt.Sprintf("%s / %s", currentTime.Format("15:04"), currentTime.Format("2006-01-02"))
		group[i].UniqueID2 = uuid.New().String()
		rand.New(rand.NewSource(time.Now().UnixNano()))
		charset := "abcdefghijklmnopqrstuvwxyz123456789"
		randomSTR := make([]byte, 8)
		for i := range randomSTR {
			randomSTR[i] = charset[rand.Intn(len(charset))]
		}
		group[i].UniqueIDQR = string(randomSTR)
	}
	orders = append(orders, group...)
	type orderIndex struct {
		index      int
		parsedTime time.Time
	}
	orderIndices := make([]orderIndex, len(orders))
	for i, order := range orders {
		pt, err := time.Parse("15:04 / 2006-01-02", order.Time)
		if err != nil {
			logger.Println(err)
			continue
		}
		orderIndices[i] = orderIndex{i, pt}
	}
	sort.Slice(orderIndices, func(i, j int) bool {
		return orderIndices[i].parsedTime.Before(orderIndices[j].parsedTime)
	})
	groupMap := make(map[string]int)
	groupCounter := 1
	for _, oi := range orderIndices {
		order := &orders[oi.index]
		if i, found := groupMap[order.Rand]; found {
			order.GroupO = orders[i].GroupO
		} else {
			order.GroupO = order.Worksite + " / Order # " + strconv.Itoa(groupCounter)
			groupMap[order.Rand] = oi.index
			groupCounter++
		}
	}
	saveO(orders)
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func getOrders(c *gin.Context) {
	orders := openO()
	sort.Slice(orders, func(i, j int) bool {
		// Split on space to separate time and date
		iParts := strings.Split(orders[i].Time, " / ")
		jParts := strings.Split(orders[j].Time, " / ")
		// Compare dates
		if iParts[1] != jParts[1] {
			return iParts[1] > jParts[1]
		}
		// If dates are the same, compare times
		return iParts[0] > jParts[0]
	})
	c.JSON(http.StatusOK, orders)
}

// ______________________________________________________________________________________________________________
func delReceive(c *gin.Context) {
	type delType struct {
		UniqueID2 string `json:"uniqueID2"`
	}
	var delInfo []delType
	if err := c.BindJSON(&delInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
	orders := openO()
	histories := openHis()
	location, err := time.LoadLocation("America/New_York")
	if err != nil {
		logger.Println(err)
	}
	currentTime := time.Now().In(location)
	for _, del := range delInfo {
		for i, item := range orders {
			if item.UniqueID2 == del.UniqueID2 {
				item.CheckTime = fmt.Sprintf("%s / %s", currentTime.Format("15:04"), currentTime.Format("2006-01-02"))
				histories = append(histories, item)
				orders = append(orders[:i], orders[i+1:]...)
				break
			}
		}
	}
	saveO(orders)
	saveHis(histories)
}

// ______________________________________________________________________________________________________________
func openHis() []Cfo {
	var histories []Cfo
	fileMutexH.Lock()
	defer fileMutexH.Unlock()
	file, err := os.Open("json/history.json")
	if err != nil {
		logger.Println(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&histories); err != nil {
		logger.Println(err)
	}
	file.Close()
	return histories
}

// ______________________________________________________________________________________________________________
func saveHis(histories []Cfo) {
	fileMutexH.Lock()
	defer fileMutexH.Unlock()
	file, err := os.Create("json/history.json")
	if err != nil {
		logger.Println(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(histories); err != nil {
		logger.Println(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func viewHis1(c *gin.Context) {
	data, err := os.ReadFile("adminPage/history.html")
	if err != nil {
		logger.Println(err)
		return
	}
	floor2_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, floor2_page)
}

// ______________________________________________________________________________________________________________
func viewHis2(c *gin.Context) {
	histories := openHis()
	sort.Slice(histories, func(i, j int) bool {
		iTime := histories[i].CheckTime
		jTime := histories[j].CheckTime
		if iTime == "" {
			iTime = histories[i].Time
		}
		if jTime == "" {
			jTime = histories[j].Time
		}
		iParts := strings.Split(iTime, " / ")
		jParts := strings.Split(jTime, " / ")
		if len(iParts) >= 2 && len(jParts) >= 2 {
			if iParts[1] != jParts[1] {
				return iParts[1] < jParts[1]
			}
		}
		return iParts[0] < jParts[0]
	})
	c.JSON(http.StatusOK, histories)
}

// ______________________________________________________________________________________________________________
func retreiveHis(c *gin.Context) {
	var retInfo Cfo
	if err := c.BindJSON(&retInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	retInfo.Check = ""
	retInfo.CheckTime = ""
	location, err := time.LoadLocation("America/New_York")
	if err != nil {
		logger.Println(err)
	}
	currentTime := time.Now().In(location)
	retInfo.Time = fmt.Sprintf("%s / %s", currentTime.Format("15:04"), currentTime.Format("2006-01-02"))
	orders := openO()
	orders = append(orders, retInfo)
	saveO(orders)
	histories := openHis()
	for i, item := range histories {
		if item.UniqueID2 == retInfo.UniqueID2 {
			histories = append(histories[:i], histories[i+1:]...)
			break
		}
	}
	saveHis(histories)
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func recQuiz(c *gin.Context) {
	data, err := os.ReadFile("receivePage/filterQuiz.js")
	if err != nil {
		logger.Println(err)
		return
	}
	c.JSON(http.StatusOK, string(data))
}

// ______________________________________________________________________________________________________________
func sortSize1(c *gin.Context) {
	type Nbrr struct {
		Nbr    string   `json:"nbr"`
		Work   string   `json:"work"`
		Sort   string   `json:"sort"`
		Constr []string `json:"constr"`
	}
	var nbr Nbrr
	if err := c.BindJSON(&nbr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	groupSize, err := strconv.Atoi(nbr.Nbr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid group size"})
		logger.Println(err)
		return
	}
	if nbr.Constr[0] == "All orders" {
		nbr.Constr = []string{}
	}
	orders := openO()
	sort.Slice(orders, func(i, j int) bool {
		// Split on space to separate time and date
		iParts := strings.Split(orders[i].Time, " / ")
		jParts := strings.Split(orders[j].Time, " / ")
		// Compare dates
		if iParts[1] != jParts[1] {
			return iParts[1] < jParts[1]
		}
		// If dates are the same, compare times
		return iParts[0] < jParts[0]
	})

	// Filter based on Worksite and Part
	var filtered []Cfo
	for _, order := range orders {
		if order.Worksite == nbr.Work {
			if nbr.Sort == "" && len(nbr.Constr) == 0 {
				filtered = append(filtered, order)
			} else if len(nbr.Constr) == 0 {
				if order.Part == nbr.Sort {
					filtered = append(filtered, order)
				}
			} else if nbr.Sort == "" {
				for _, item := range nbr.Constr {
					if item == order.Floor || item == order.Unit || item == order.GroupO {
						filtered = append(filtered, order)
					}
				}
			} else {
				for _, item := range nbr.Constr {
					if (item == order.Floor || item == order.Unit || item == order.GroupO) && order.Part == nbr.Sort {
						filtered = append(filtered, order)
					}
				}
			}
		}
	}

	// Sort the filtered slice into groups and then by dimensions
	var result []Cfo
	for len(filtered) > 0 {
		end := groupSize
		if end > len(filtered) {
			end = len(filtered)
		}
		group := filtered[:end]
		filtered = filtered[end:]

		// Sort the group by the sum of dimensions
		sort.Slice(group, func(i, j int) bool {
			sumI, _ := strconv.ParseFloat(group[i].Sum, 64)
			sumJ, _ := strconv.ParseFloat(group[j].Sum, 64)
			return sumI > sumJ
		})
		result = append(result, group...)
	}
	c.JSON(http.StatusOK, result)
}

// ______________________________________________________________________________________________________________
func groupByAttributes(cfoss []Cfo) map[string][]Cfo {
	grouped := make(map[string][]Cfo)
	for _, cfo := range cfoss {
		if cfo.Length2 == "" {
			cfo.Length2 = cfo.Length
		}
		key := cfo.Type + cfo.Length2 + cfo.Thickness
		grouped[key] = append(grouped[key], cfo)
	}
	return grouped
}

// ______________________________________________________________________________________________________________
func assignToSheets(attributeGroup []Cfo) []Cfo {
	var result []Cfo
	var tempSum float64
	var sheetParts []Cfo

	for _, part := range attributeGroup {
		partSum, _ := strconv.ParseFloat(part.Sum, 64)
		if tempSum+partSum <= 48 {
			sheetParts = append(sheetParts, part)
			tempSum += partSum
		} else {
			if len(sheetParts) > 1 {
				sheetID := strconv.Itoa(sheetCounter)
				sheetCounter++
				for _, p := range sheetParts {
					p.Sheet = sheetID
					result = append(result, p)
				}
			} else if len(sheetParts) == 1 {
				sheetParts[0].Sheet = ""
				result = append(result, sheetParts[0])
			}
			sheetParts = []Cfo{part}
			tempSum = partSum
		}
	}
	// Process remaining sheetParts
	if len(sheetParts) > 1 {
		sheetID := strconv.Itoa(rand.Intn(1000))
		for _, p := range sheetParts {
			p.Sheet = sheetID
			result = append(result, p)
		}
	} else if len(sheetParts) == 1 {
		sheetParts[0].Sheet = ""
		result = append(result, sheetParts[0])
	}

	return result
}

// ______________________________________________________________________________________________________________
func assignOrderWithinBundles(partsWithSheets *[]Cfo, groupSize int) {
	for i := 0; i < len(*partsWithSheets); i += groupSize {
		end := i + groupSize
		if end > len(*partsWithSheets) {
			end = len(*partsWithSheets)
		}

		// Sub-slice to represent a single bundle
		bundle := (*partsWithSheets)[i:end]

		// Creating a sorted index of bundle based on Sum
		sortedIndices := make([]int, len(bundle))
		for j := range sortedIndices {
			sortedIndices[j] = j
		}
		sort.Slice(sortedIndices, func(x, y int) bool {
			sumX, _ := strconv.ParseFloat(bundle[sortedIndices[x]].Sum, 64)
			sumY, _ := strconv.ParseFloat(bundle[sortedIndices[y]].Sum, 64)
			return sumX > sumY
		})

		// Assigning order to each part in the bundle based on sorted indices
		for j, index := range sortedIndices {
			bundle[index].Order = strconv.Itoa(j + 1)
		}
	}
}

// ______________________________________________________________________________________________________________
func isOtherBundle(n string, j int, slic []Cfo) bool {
	if j+2 <= len(slic) {
		for _, item := range slic[j+1 : j+2] {
			if item.Sheet == n {
				for idx2 := j + 1; idx2 < len(slic); idx2++ {
					item2 := &slic[idx2]
					if item2.Sheet == n {
						item2.Order2 = "1"
					}
				}
				return true
			} else {
				return false
			}
		}
		return false
	}
	return false
}

// ______________________________________________________________________________________________________________
func sortSize2(c *gin.Context) {
	type Nbrr struct {
		Nbr    string   `json:"nbr"`
		Work   string   `json:"work"`
		Sort   string   `json:"sort"`
		Constr []string `json:"constr"`
	}
	type SheetKey struct {
		Type      string
		Thickness string
		Length    string
		Sheet     string
	}
	type SheetSummary struct {
		Type      string `json:"type"`
		Thickness string `json:"thickness"`
		Length    string `json:"length"`
		Count     int    `json:"count"`
	}
	var nbr Nbrr
	if err := c.BindJSON(&nbr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	groupSize, err := strconv.Atoi(nbr.Nbr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid group size"})
		logger.Println(err)
		return
	}
	orders := openO()
	sort.Slice(orders, func(i, j int) bool {
		// Split on space to separate time and date
		iParts := strings.Split(orders[i].Time, " / ")
		jParts := strings.Split(orders[j].Time, " / ")
		// Compare dates
		if iParts[1] != jParts[1] {
			return iParts[1] < jParts[1]
		}
		// If dates are the same, compare times
		return iParts[0] < jParts[0]
	})

	if nbr.Constr[0] == "All orders" {
		nbr.Constr = []string{}
	}

	// Filter based on Worksite and Part
	var filtered []Cfo
	for _, order := range orders {
		if order.Worksite == nbr.Work {
			if nbr.Sort == "" && len(nbr.Constr) == 0 {
				filtered = append(filtered, order)
			} else if len(nbr.Constr) == 0 {
				if order.Part == nbr.Sort {
					filtered = append(filtered, order)
				}
			} else if nbr.Sort == "" {
				for _, item := range nbr.Constr {
					if item == order.Floor || item == order.Unit || item == order.GroupO {
						filtered = append(filtered, order)
					}
				}
			} else {
				for _, item := range nbr.Constr {
					if (item == order.Floor || item == order.Unit || item == order.GroupO) && order.Part == nbr.Sort {
						filtered = append(filtered, order)
					}
				}
			}
		}
	}
	sheetCounter = 0
	sort.Slice(filtered, func(i, j int) bool {
		sumI, _ := strconv.ParseFloat(filtered[i].Sum, 64)
		sumJ, _ := strconv.ParseFloat(filtered[j].Sum, 64)
		return sumI > sumJ
	})

	attributeGroups := groupByAttributes(filtered)
	keys := make([]string, 0, len(attributeGroups))
	for k := range attributeGroups {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	var partsWithSheets []Cfo
	for _, key := range keys {
		group := attributeGroups[key]
		group = assignToSheets(group)
		partsWithSheets = append(partsWithSheets, group...)
	}

	assignOrderWithinBundles(&partsWithSheets, groupSize)

	var tmp2 string
	var tmp3 string
	tmp4 := 921737
	var firstL = true
	for idx := range partsWithSheets {
		item := &partsWithSheets[idx]

		if item.Sheet == "" {
			item.Order2 = item.Order
			if item.Order == "10" {
				tmp4 = idx
			}
		} else if item.Sheet != "" && item.Order2 == "" {
			if firstL {
				tmp2 = item.Sheet
				tmp3 = item.Order
				item.Order2 = item.Order
				firstL = false
			}
			if (idx+1)%groupSize == 0 && isOtherBundle(item.Sheet, idx, partsWithSheets) {
				item.Order2 = "10"
				for i := 0; i < idx; i++ {
					if partsWithSheets[i].Sheet == item.Sheet {
						partsWithSheets[i].Order2 = "10"
					}
				}
				if tmp4 != 921737 {
					partsWithSheets[tmp4].Order2 = "9"
				}
				continue
			} else if (idx+1)%groupSize == 0 {
				if tmp4 != 921737 {
					partsWithSheets[tmp4].Order2 = "10"
				}
			}
			if item.Sheet == tmp2 {
				item.Order2 = tmp3
			} else if item.Sheet != tmp2 {
				tmp2 = item.Sheet
				tmp3 = item.Order
				item.Order2 = item.Order
			}
		}
	}

	for start := 0; start < len(partsWithSheets); start += groupSize {
		end := start + groupSize
		if end > len(partsWithSheets) {
			end = len(partsWithSheets)
		}

		sort.Slice(partsWithSheets[start:end], func(i, j int) bool {
			sumI, _ := strconv.ParseFloat(partsWithSheets[start+i].Order2, 64)
			sumJ, _ := strconv.ParseFloat(partsWithSheets[start+j].Order2, 64)
			if sumI == sumJ {
				return i < j
			}
			return sumI < sumJ
		})
	}
	countMap := make(map[SheetKey]int)
	m := make(map[string]int)
	for _, cfo := range partsWithSheets {
		key := SheetKey{
			Type:      cfo.Type,
			Thickness: cfo.Thickness,
			Length:    cfo.Length2,
		}
		value, exists := m[cfo.Sheet]
		if (exists && value < 0) || !exists || cfo.Sheet == "" {
			countMap[key]++
		}
		m[cfo.Sheet]++
	}
	var newType string
	oldType := make(map[string]bool)
	var summaries []SheetSummary
	for key0 := range countMap {
		newType = key0.Type
		if !oldType[key0.Type] {
			for key, count := range countMap {
				if key.Type == newType {
					summaries = append(summaries, SheetSummary{
						Type:      key.Type,
						Thickness: key.Thickness,
						Length:    key.Length,
						Count:     count,
					})
				}
			}
		}
		oldType[key0.Type] = true
	}
	type ResponseData struct {
		PartsWithSheets []Cfo
		Summaries       []SheetSummary
	}
	responseData := ResponseData{
		PartsWithSheets: partsWithSheets,
		Summaries:       summaries,
	}
	c.JSON(http.StatusOK, responseData)
}

// ______________________________________________________________________________________________________________
func savePrst(c *gin.Context) {
	type Prst2 struct {
		User   string   `json:"user"`
		Work   string   `json:"work"`
		Sort   string   `json:"sort"`
		Constr []string `json:"constr"`
		Nbr    string   `json:"nbr"`
		Name   string   `json:"name"`
	}
	var prst Prst2
	var db []DB
	if err := c.BindJSON(&prst); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	file, err := os.Open("json/userDB.json")
	if err != nil {
		logger.Println(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&db); err != nil {
		file.Close()
		logger.Println(err)
	}
	file.Close()
	preDB := Prst{
		Work:   prst.Work,
		Sort:   prst.Sort,
		Constr: prst.Constr,
		Nbr:    prst.Nbr,
		Name:   prst.Name,
	}
	DOexist := false
	for i, item := range db {
		if item.User == prst.User {
			db[i].Prst = append(db[i].Prst, preDB)
			DOexist = true
			break
		}
	}
	if !DOexist {
		var newDB DB
		newDB.User = prst.User
		newDB.Prst = append(newDB.Prst, preDB)
		db = append(db, newDB)
	}
	file, err = os.Create("json/userDB.json")
	if err != nil {
		logger.Println(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(&db); err != nil {
		logger.Println(err)
	}
	file.Close()
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func getPrst(c *gin.Context) {
	type Prst2 struct {
		User string `json:"user"`
		Work string `json:"work"`
	}
	var prst Prst2
	var db []DB
	if err := c.BindJSON(&prst); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	file, err := os.Open("json/userDB.json")
	if err != nil {
		logger.Println(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&db); err != nil {
		file.Close()
		logger.Println(err)
	}
	file.Close()
	for _, item := range db {
		if item.User == prst.User {
			c.JSON(http.StatusOK, item.Prst)
			return
		}
	}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func rmPrst(c *gin.Context) {
	type Prst2 struct {
		User string `json:"user"`
		Work string `json:"work"`
		Name string `json:"name"`
	}
	var prst Prst2
	var db []DB
	if err := c.BindJSON(&prst); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	file, err := os.Open("json/userDB.json")
	if err != nil {
		logger.Println(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&db); err != nil {
		file.Close()
		logger.Println(err)
	}
	file.Close()
	for i, item := range db {
		if item.User == prst.User {
			var updatedPrst []Prst
			for _, item2 := range item.Prst {
				if !(item2.Work == prst.Work && item2.Name == prst.Name) {
					updatedPrst = append(updatedPrst, item2)
				}
			}
			db[i].Prst = updatedPrst
		}
	}
	file, err = os.Create("json/userDB.json")
	if err != nil {
		logger.Println(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(&db); err != nil {
		file.Close()
		logger.Println(err)
	}
	file.Close()
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func mHis0(c *gin.Context) {
	if err := c.BindJSON(&Cinfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func mHis(c *gin.Context) {
	type Mnth struct {
		Month string `json:"month"`
	}
	var retM Mnth
	if err := c.BindJSON(&retM); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
	histories := openHis()
	if retM.Month == "all" {
		if Cinfo.Worksite == "" {
			hisM = append(hisM, histories...)
		} else if Cinfo.Floor == "" {
			for _, item := range histories {
				if item.Worksite == Cinfo.Worksite {
					hisM = append(hisM, item)
				}
			}
		} else if Cinfo.Unit == "" {
			for _, item := range histories {
				if item.Worksite == Cinfo.Worksite && item.Floor == Cinfo.Floor {
					hisM = append(hisM, item)
				}
			}
		} else {
			for _, item := range histories {
				if item.Worksite == Cinfo.Worksite && item.Floor == Cinfo.Floor && item.Unit == Cinfo.Unit {
					hisM = append(hisM, item)
				}
			}
		}
	} else {
		retM2, err := strconv.Atoi(retM.Month)
		if err != nil {
			logger.Println(err)
			return
		}
		currentMonth := int(time.Now().Month())
		if Cinfo.Worksite == "" {
			if retM2 == 0 {
				for _, item := range histories {
					parsedTime, err := time.Parse("15:04 / 2006-01-02", item.Time)
					if err != nil {
						logger.Println(err)
						return
					}
					month := int(parsedTime.Month())
					if month == currentMonth {
						hisM = append(hisM, item)
					}
				}
			} else {
				for _, item := range histories {
					parsedTime, err := time.Parse("15:04 / 2006-01-02", item.Time)
					if err != nil {
						logger.Println(err)
						return
					}
					month := int(parsedTime.Month())
					if month == (currentMonth - retM2) {
						hisM = append(hisM, item)
					}
				}
			}
		} else if Cinfo.Floor == "" {
			if retM2 == 0 {
				for _, item := range histories {
					parsedTime, err := time.Parse("15:04 / 2006-01-02", item.Time)
					if err != nil {
						logger.Println(err)
						return
					}
					month := int(parsedTime.Month())
					if month == currentMonth && item.Worksite == Cinfo.Worksite {
						hisM = append(hisM, item)
					}
				}
			} else {
				for _, item := range histories {
					parsedTime, err := time.Parse("15:04 / 2006-01-02", item.Time)
					if err != nil {
						logger.Println(err)
						return
					}
					month := int(parsedTime.Month())
					if month == (currentMonth-retM2) && item.Worksite == Cinfo.Worksite {
						hisM = append(hisM, item)
					}
				}
			}
		} else if Cinfo.Unit == "" {
			if retM2 == 0 {
				for _, item := range histories {
					parsedTime, err := time.Parse("15:04 / 2006-01-02", item.Time)
					if err != nil {
						logger.Println(err)
						return
					}
					month := int(parsedTime.Month())
					if month == currentMonth && item.Worksite == Cinfo.Worksite && item.Floor == Cinfo.Floor {
						hisM = append(hisM, item)
					}
				}
			} else {
				for _, item := range histories {
					parsedTime, err := time.Parse("15:04 / 2006-01-02", item.Time)
					if err != nil {
						logger.Println(err)
						return
					}
					month := int(parsedTime.Month())
					if month == (currentMonth-retM2) && item.Worksite == Cinfo.Worksite && item.Floor == Cinfo.Floor {
						hisM = append(hisM, item)
					}
				}
			}
		} else {
			if retM2 == 0 {
				for _, item := range histories {
					parsedTime, err := time.Parse("15:04 / 2006-01-02", item.Time)
					if err != nil {
						logger.Println(err)
						return
					}
					month := int(parsedTime.Month())
					if month == currentMonth && item.Worksite == Cinfo.Worksite && item.Floor == Cinfo.Floor && item.Unit == Cinfo.Unit {
						hisM = append(hisM, item)
					}
				}
			} else {
				for _, item := range histories {
					parsedTime, err := time.Parse("15:04 / 2006-01-02", item.Time)
					if err != nil {
						logger.Println(err)
						return
					}
					month := int(parsedTime.Month())
					if month == (currentMonth-retM2) && item.Worksite == Cinfo.Worksite && item.Floor == Cinfo.Floor && item.Unit == Cinfo.Unit {
						hisM = append(hisM, item)
					}
				}
			}
		}
	}
}

// ______________________________________________________________________________________________________________
func mHis2(c *gin.Context) {
	data, err := os.ReadFile("adminPage/monthHis.html")
	if err != nil {
		logger.Println(err)
		return
	}
	floor2_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, floor2_page)
}

// ______________________________________________________________________________________________________________
func mHis3(c *gin.Context) {
	c.JSON(http.StatusOK, hisM)
	hisM = []Cfo{}
}

// ______________________________________________________________________________________________________________
func unitProgress1(c *gin.Context) {
	type Pgrs struct {
		Uid2  string `json:"uid2"`
		Check string `json:"check"`
	}
	var PgrsData Pgrs
	if err := c.BindJSON(&PgrsData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
	orders := openO()
	for i, item := range orders {
		if item.UniqueID2 == PgrsData.Uid2 && PgrsData.Check == "1" && item.Check == "" {
			orders[i].Check = "1"
			break
		} else if item.UniqueID2 == PgrsData.Uid2 && PgrsData.Check == "" && item.Check == "1" {
			orders[i].Check = ""
			break
		}
	}
	saveO(orders)
}

// ______________________________________________________________________________________________________________
func unitProgress2(c *gin.Context) {
	type Pgrs3 struct {
		User     string `json:"user"`
		Worksite string `json:"worksite"`
	}
	type Pgrs4 struct {
		Unit  string `json:"unit"`
		Check string `json:"check"`
		Rand  string `json:"rand"`
		Time  string `json:"time"`
		Parts string `json:"parts"`
	}

	var PgrsData Pgrs3
	var progresses0 []Pgrs4
	if err := c.BindJSON(&PgrsData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	orders := openO()

	randTimes := make(map[string]time.Time)
	for _, item := range orders {
		if item.User == PgrsData.User && item.Worksite == PgrsData.Worksite {
			tmp := Pgrs4{
				Unit:  item.Unit,
				Check: item.Check,
				Rand:  item.Rand,
				Time:  item.Time,
				Parts: item.Part,
			}
			progresses0 = append(progresses0, tmp)

			parsedTime, err := parseTimeString(item.Time)
			if err != nil {
				logger.Println(err)
				continue
			}
			randTimes[item.Rand] = parsedTime
		}
	}

	unitProgress := make(map[string]int)
	unitCheckCount := make(map[string]int)

	for _, item := range progresses0 {
		if item.Check == "1" {
			unitProgress[item.Rand]++
		}
		unitCheckCount[item.Rand]++
	}

	// Convert map to slice of structs for sorting
	type RandTimeEntry struct {
		Rand string
		Time time.Time
	}
	var entries []RandTimeEntry
	for rand, t := range randTimes {
		entries = append(entries, RandTimeEntry{rand, t})
	}

	// Sort the entries based on time
	sort.Slice(entries, func(i, j int) bool {
		return entries[i].Time.Before(entries[j].Time)
	})

	var parts []string
	// Now, loop through sorted RandTimeEntry to append final progress values to progressItems
	for _, entry := range entries {
		rand := entry.Rand
		progress := fmt.Sprintf("%.0f%%", float64(unitProgress[rand])/float64(unitCheckCount[rand])*100)

		// Find the corresponding unit for this rand value from progresses0.
		var unitForRand string
		for _, item := range progresses0 {
			if item.Rand == rand {
				unitForRand = item.Unit
				parts = append(parts, item.Parts+"."+item.Check)
			}
		}

		progressItems = append(progressItems, Pgrs2{Rand: rand, Progress: progress, Unit: unitForRand, Parts: strings.Join(parts, " ")})
		parts = []string{}
	}

	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func parseTimeString(t string) (time.Time, error) {
	const layout = "15:04 / 2006-01-02"
	return time.Parse(layout, t)
}

// ______________________________________________________________________________________________________________
func unitProgress3(c *gin.Context) {
	c.JSON(http.StatusOK, progressItems)
	progressItems = []Pgrs2{}
}

// ______________________________________________________________________________________________________________
func adminUser(c *gin.Context) {
	data, err := os.ReadFile("adminPage/adminUser.html")
	if err != nil {
		logger.Println(err)
		return
	}
	floor2_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, floor2_page)
}

// ______________________________________________________________________________________________________________
func adminHistory(c *gin.Context) {
	data, err := os.ReadFile("adminPage/adminHistory.html")
	if err != nil {
		logger.Println(err)
		return
	}
	floor2_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, floor2_page)
}

// ______________________________________________________________________________________________________________
func adminWorksite(c *gin.Context) {
	data, err := os.ReadFile("adminPage/adminWorksite.html")
	if err != nil {
		logger.Println(err)
		return
	}
	floor2_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, floor2_page)
}

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func main() {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Use(cors.Default())
	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))
	router.GET("/", home)
	router.GET("/login98", login98)
	router.POST("/login99", login)
	authMiddleware := func(c *gin.Context) {
		// Read the username from the cookie
		username, err := c.Cookie("username4221")
		if err != nil || username == "" {
			// If the user is not authenticated, redirect to the login page
			c.Redirect(http.StatusSeeOther, "/")
			c.Abort() // Stop processing other handlers
			return
		}
	}
	authMiddleware2 := func(c *gin.Context) {
		// Read the username from the cookie
		username, err := c.Cookie("username7834")
		if err != nil || username == "" {
			// If the user is not authenticated, redirect to the login page
			c.Redirect(http.StatusSeeOther, "/")
			c.Abort() // Stop processing other handlers
			return
		}
	}
	authMiddleware3 := func(c *gin.Context) {
		// Read the username from the cookie
		username, err := c.Cookie("username0623")
		if err != nil || username == "" {
			// If the user is not authenticated, redirect to the login page
			c.Redirect(http.StatusSeeOther, "/")
			c.Abort() // Stop processing other handlers
			return
		}
	}
	authMiddleware4 := func(c *gin.Context) {
		// Read the username from the cookie
		username, err := c.Cookie("username4221")
		if err != nil || username == "" {
			username, err = c.Cookie("username7834")
			if err != nil || username == "" {
				username, err = c.Cookie("username0623")
				if err != nil || username == "" {
					c.Redirect(http.StatusSeeOther, "/")
					c.Abort()
					return
				}
			}
		}
	}
	router.GET("/loginOrder", authMiddleware, loginOrder)
	router.GET("/loginReceiver", authMiddleware2, loginReceiver)
	router.GET("/loginAdmin", authMiddleware3, loginAdmin)
	router.GET("/adminUser", authMiddleware3, adminUser)
	router.GET("/adminHistory", authMiddleware3, adminHistory)
	router.GET("/adminWorksite", authMiddleware3, adminWorksite)
	router.POST("/mHis0", authMiddleware3, mHis0)
	router.POST("/mHis", authMiddleware3, mHis)
	router.GET("/mHis2", authMiddleware3, mHis2)
	router.GET("/mHis3", authMiddleware3, mHis3)
	router.GET("/getUser", authMiddleware3, getUser)
	router.POST("/addUser", authMiddleware3, addUser)
	router.POST("/delUser", authMiddleware3, delUser)
	router.GET("/getUser2", authMiddleware3, getUser2)
	router.GET("/getWorksites", authMiddleware4, getWorksites)
	router.POST("/addWorksite", authMiddleware3, addWorksite)
	router.POST("/delWorksite", authMiddleware3, delWorksite)
	router.POST("/editWorksite", authMiddleware3, editWorksite)
	router.POST("/getFloors", authMiddleware4, getFloors)
	router.POST("/addFloor", authMiddleware, addFloor)
	router.POST("/delFloor", authMiddleware, delFloor)
	router.POST("/editFloor", authMiddleware, editFloor)
	router.POST("/getUnits", authMiddleware4, getUnits)
	router.POST("/addUnit", authMiddleware, addUnit)
	router.POST("/delUnit", authMiddleware, delUnit)
	router.POST("/editUnit", authMiddleware, editUnit)
	router.POST("/sendGroup", authMiddleware, sendGroup)
	router.GET("/getOrders", authMiddleware2, getOrders)
	router.POST("/delReceive", authMiddleware2, delReceive)
	router.GET("/viewHis1", authMiddleware2, viewHis1)
	router.GET("/viewHis2", authMiddleware2, viewHis2)
	router.POST("/retreiveHis", authMiddleware2, retreiveHis)
	router.GET("/recQuiz", authMiddleware2, recQuiz)
	router.POST("/sortSize1", authMiddleware2, sortSize1)
	router.POST("/sortSize2", authMiddleware2, sortSize2)
	router.POST("/savePrst", authMiddleware2, savePrst)
	router.POST("/getPrst", authMiddleware2, getPrst)
	router.POST("/rmPrst", authMiddleware2, rmPrst)
	router.POST("/unitProgress1", authMiddleware2, unitProgress1)
	router.POST("/unitProgress2", authMiddleware, unitProgress2)
	router.GET("/unitProgress3", authMiddleware, unitProgress3)
	router.GET("/image1", func(c *gin.Context) {
		c.File("./img/parts/image1.jpg")
	})
	router.GET("/image2", func(c *gin.Context) {
		c.File("./img/parts/image2.jpg")
	})
	router.GET("/image3", func(c *gin.Context) {
		c.File("./img/parts/image3.jpg")
	})
	router.GET("/image4", func(c *gin.Context) {
		c.File("./img/parts/image4.jpg")
	})
	router.GET("/image5", func(c *gin.Context) {
		c.File("./img/parts/image5.jpg")
	})
	router.GET("/image6", func(c *gin.Context) {
		c.File("./img/parts/image6.jpg")
	})
	router.GET("/image7", func(c *gin.Context) {
		c.File("./img/parts/image7.jpg")
	})
	router.GET("/image8", func(c *gin.Context) {
		c.File("./img/parts/image8.jpg")
	})
	router.GET("/image9", func(c *gin.Context) {
		c.File("./img/parts/image9.jpg")
	})
	router.GET("/image10", func(c *gin.Context) {
		c.File("./img/parts/image10.jpg")
	})
	router.GET("/image11", func(c *gin.Context) {
		c.File("./img/parts/image11.jpg")
	})
	router.GET("/image12", func(c *gin.Context) {
		c.File("./img/parts/image12.jpg")
	})
	router.GET("/image13", func(c *gin.Context) {
		c.File("./img/parts/image13.jpg")
	})
	router.GET("/image14", func(c *gin.Context) {
		c.File("./img/parts/image14.jpg")
	})
	router.GET("/image15", func(c *gin.Context) {
		c.File("./img/parts/image15.jpg")
	})
	router.GET("/dwnl", func(c *gin.Context) {
		c.File("./img/other/dwnl.PNG")
	})
	router.GET("/favicon", func(c *gin.Context) {
		c.File("./img/other/midTlogo.png")
	})
	router.GET("/fscreen", func(c *gin.Context) {
		c.File("./img/other/Fscreen.PNG")
	})
	router.GET("/padlockUN", func(c *gin.Context) {
		c.File("./img/other/padlock2.PNG")
	})
	router.GET("/padlockLO", func(c *gin.Context) {
		c.File("./img/other/padlock1.PNG")
	})
	router.GET("/bell1", func(c *gin.Context) {
		c.File("./img/other/bell1.PNG")
	})
	router.GET("/bell2", func(c *gin.Context) {
		c.File("./img/other/bell2.PNG")
	})
	router.GET("/MidPrefabIMG", func(c *gin.Context) {
		c.File("./img/other/prefab.png")
	})
	router.GET("/PWRL", func(c *gin.Context) {
		c.File("./img/other/logoutB.png")
	})
	router.POST("/uploadIMG", func(c *gin.Context) {
		file, _ := c.FormFile("image")
		if file == nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "No file is received",
			})
			return
		}
		if err := c.SaveUploadedFile(file, "./img/UploadedIMG/"+file.Filename); err != nil {
			logger.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Unable to save the file",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "File successfully uploaded",
		})
	})
	router.POST("/upIMG", func(c *gin.Context) {
		type Simg struct {
			Image string `json:"image"`
		}
		var imageFilePath Simg
		if err := c.BindJSON(&imageFilePath); err != nil {
			logger.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		imageData, err := os.ReadFile("./img/UploadedIMG/" + imageFilePath.Image)
		if err != nil {
			logger.Println(err)
			c.String(http.StatusInternalServerError, "Internal Server Error")
			return
		}
		ext := strings.ToLower(filepath.Ext(imageFilePath.Image))
		var contentType string
		switch ext {
		case ".jpg", ".jpeg":
			contentType = "image/jpeg"
		case ".png":
			contentType = "image/png"
		default:
			contentType = "application/octet-stream"
		}
		c.Data(http.StatusOK, contentType, imageData)
	})
	router.POST("/rmCook", func(c *gin.Context) {
		c.SetCookie("username4221", "", -1, "/", "", false, true)
		c.SetCookie("username7834", "", -1, "/", "", false, true)
		c.JSON(http.StatusOK, gin.H{"message": "Cookie removed"})
	})
	numImages := 14
	for i := 1; i <= numImages; i++ {
		index := i
		router.GET("/part"+strconv.Itoa(index), func(c *gin.Context) {
			data, err := os.ReadFile("part" + strconv.Itoa(index) + ".html")
			if err != nil {
				c.String(http.StatusInternalServerError, "Error reading part file")
				return
			}
			partPage := string(data)
			c.Header("Content-Type", "text/html")
			c.String(http.StatusOK, partPage)
		})
	}
	certPath := "server.crt"
	keyPath := "private.key"
	err := router.RunTLS(":443", certPath, keyPath)
	if err != nil {
		fmt.Println("Failed")
	}
	fmt.Println("Server listening on localhost:443")
}

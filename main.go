package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Cred struct {
	User     string `json:"user"`
	Password string `json:"password"`
}
type Cred2 struct {
	User1     string `json:"user1"`
	Password1 string `json:"password1"`
	User2     string `json:"user2"`
	Password2 string `json:"password2"`
}
type Cfo struct {
	Time      string `json:"time"`
	User      string `json:"user"`
	Worksite  string `json:"worksite"`
	Floor     string `json:"floor"`
	Unit      string `json:"unit"`
	Type      string `json:"type"`
	Part      string `json:"part"`
	Side      string `json:"side"`
	Thickness string `json:"thickness"`
	Length    string `json:"length"`
	DA        string `json:"dA"`
	DB        string `json:"dB"`
	DC        string `json:"dC"`
	DD        string `json:"dD"`
	DE        string `json:"dE"`
	D1A       string `json:"d1A"`
	D2A       string `json:"d2A"`
	D1B       string `json:"d1B"`
	D2B       string `json:"d2B"`
	DR        string `json:"dR"`
	DR_P      string `json:"dR_P"`
	DH        string `json:"dH"`
	DW        string `json:"dW"`
	Edge1     string `json:"edge1"`
	Edge2     string `json:"edge2"`
	Price     string `json:"price"`
	Check     string `json:"check"`
	Rand      string `json:"rand"`
	Sum       string `json:"sum"`
	UniqueID  string `json:"uniqueID"`
	UniqueID2 string `json:"uniqueID2"`
}
type Work struct {
	Worksite string `json:"worksite"`
}
type Flor struct {
	Floor string `json:"floor"`
	Cinf  Cfo    `json:"Cinfo"`
}
type Flor2 struct {
	Floor string `json:"floor"`
}
type Unt struct {
	Unit string `json:"unit"`
	Cinf Cfo    `json:"Cinfo"`
}
type Unt2 struct {
	Unit string `json:"unit"`
}
type Pgrs struct {
	Uid2  string `json:"uid2"`
	Check string `json:"check"`
}
type Pgrs2 struct {
	Unit     string `json:"unit"`
	Progress string `json:"progress"`
	Rand     string `json:"rand"`
}

var order_login []Cred
var receive_login []Cred
var admin_login []Cred
var worksites []Work
var floors []Flor2
var units []Unt2
var Cinfo Cfo
var orders []Cfo
var histories []Cfo
var groupOrders []Cfo
var input string
var randomPassword []byte
var Cusername string
var hisM []Cfo
var progressItems []Pgrs2
var orders3 []Cfo

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func loadCred() {
	file, err := os.Open("order_login.json")
	if err != nil {
		if os.IsNotExist(err) {
			order_login = []Cred{}
		}
		panic(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&order_login); err != nil {
		panic(err)
	}
	file.Close()
	file, err = os.Open("receive_login.json")
	if err != nil {
		if os.IsNotExist(err) {
			receive_login = []Cred{}
		}
		panic(err)
	}
	decoder = json.NewDecoder(file)
	if err := decoder.Decode(&receive_login); err != nil {
		panic(err)
	}
	file.Close()
	file, err = os.Open("admin_login.json")
	if err != nil {
		if os.IsNotExist(err) {
			admin_login = []Cred{}
		}
		panic(err)
	}
	decoder = json.NewDecoder(file)
	if err := decoder.Decode(&admin_login); err != nil {
		panic(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func home(c *gin.Context) {
	data, err := os.ReadFile("login.html")
	if err != nil {
		return
	}
	loging_page := string(data)

	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, loging_page)
}

// ______________________________________________________________________________________________________________
func login(c *gin.Context) {
	var password Cred
	if err := c.BindJSON(&password); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	for _, cred := range order_login {
		if cred.User == password.User && cred.Password == password.Password {
			c.SetCookie("username4221", password.User, 0, "/", "", false, true)
			c.String(200, "/loginOrder")
			return
		}
	}
	for _, cred := range receive_login {
		if cred.User == password.User && cred.Password == password.Password {
			c.SetCookie("username7834", password.User, 0, "/", "", false, true)
			c.String(200, "/loginReceiver")
			return
		}
	}
	for _, cred := range admin_login {
		if cred.User == password.User && cred.Password == password.Password {
			c.SetCookie("username0623", password.User, 0, "/", "", false, true)
			c.String(200, "/loginAdmin")
			return
		}
	}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func loginOrder(c *gin.Context) {
	data, err := os.ReadFile("orderPage.html")
	if err != nil {
		return
	}
	worksite_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, worksite_page)
}

// ______________________________________________________________________________________________________________
func loginReceiver(c *gin.Context) {
	data, err := os.ReadFile("receivePage.html")
	if err != nil {
		return
	}
	worksite_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, worksite_page)
}

// ______________________________________________________________________________________________________________
func loginAdmin(c *gin.Context) {
	data, err := os.ReadFile("adminPanel.html")
	if err != nil {
		return
	}
	worksite_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, worksite_page)
}

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func getUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"inputs": order_login})
}

// ______________________________________________________________________________________________________________
func addUser(c *gin.Context) {
	var nUsr Cred
	if err := c.ShouldBindJSON(&nUsr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	order_login = append(order_login, nUsr)
	files := "order_login.json"
	file, err := os.Create(files)
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(order_login); err != nil {
		panic(err)
	}
	file.Close()
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func delUser(c *gin.Context) {
	var dUsr Cred
	if err := c.BindJSON(&dUsr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	for i, item := range order_login {
		if item.User == dUsr.User {
			order_login = append(order_login[:i], order_login[i+1:]...)
			break
		}
	}
	files := "order_login.json"
	file, err := os.Create(files)
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(order_login); err != nil {
		panic(err)
	}
	file.Close()
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func getUser2(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"items": receive_login})
}

// ______________________________________________________________________________________________________________
func addUser2(c *gin.Context) {
	var nUsr Cred
	if err := c.ShouldBindJSON(&nUsr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	receive_login = append(receive_login, nUsr)
	files := "receive_login.json"
	file, err := os.Create(files)
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(receive_login); err != nil {
		panic(err)
	}
	file.Close()
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func delUser2(c *gin.Context) {
	var dUsr Cred
	if err := c.BindJSON(&dUsr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	fmt.Println(dUsr)
	for i, item := range receive_login {
		if item.User == dUsr.User {
			receive_login = append(receive_login[:i], receive_login[i+1:]...)
			break
		}
	}
	files := "receive_login.json"
	file, err := os.Create(files)
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(receive_login); err != nil {
		panic(err)
	}
	file.Close()
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func getCurUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"user": Cusername})
}

// ______________________________________________________________________________________________________________
func getWorksites(c *gin.Context) {
	file, err := os.Open("worksites.json")
	if err != nil {
		if os.IsNotExist(err) {
			worksites = []Work{}
		}
		panic(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&worksites); err != nil {
		panic(err)
	}
	file.Close()
	c.JSON(http.StatusOK, gin.H{"worksites": worksites})
}

// ______________________________________________________________________________________________________________
func addWorksite(c *gin.Context) {
	var nWork Work
	if err := c.ShouldBindJSON(&nWork); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	tt := []Flor{}
	worksites = append(worksites, nWork)
	files := string(nWork.Worksite) + "_floors.json"
	file, err := os.Create(files)
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(tt); err != nil {
		panic(err)
	}
	file.Close()
	saveWorksite()
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func saveWorksite() {
	file, err := os.Create("worksites.json")
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(worksites); err != nil {
		panic(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func delWorksite(c *gin.Context) {
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
	files := string(dWork.Worksite) + "_floors.json"
	fmt.Println(files)
	err := os.Remove(files)
	if err != nil {
		return
	}
	saveWorksite()
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func editWorksite(c *gin.Context) {
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
	oldName := string(EditW.OldWorksite) + "_floors.json"
	newName := string(EditW.Worksite) + "_floors.json"
	fmt.Println(oldName)
	fmt.Println(newName)
	err := os.Rename(oldName, newName)
	if err != nil {
		return
	}
	saveWorksite()
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func selectWorksite(c *gin.Context) {
	if err := c.BindJSON(&Cinfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
	Cinfo.User = Cusername
}

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func openFloor() {
	files := string(Cinfo.Worksite) + "_floors.json"
	fmt.Println(files)
	file, err := os.Open(files)
	if err != nil {
		if os.IsNotExist(err) {
			floors = []Flor2{}
		}
		panic(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&floors); err != nil {
		panic(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func getFloors2(c *gin.Context) {
	openFloor()
	c.JSON(http.StatusOK, gin.H{"floors": floors})
	floors = []Flor2{}
}

// ______________________________________________________________________________________________________________
func getFloors3(c *gin.Context) {
	c.JSON(http.StatusOK, Cinfo)
}

// ______________________________________________________________________________________________________________
func addFloor(c *gin.Context) {
	var nFloor Flor
	if err := c.ShouldBindJSON(&nFloor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	Cinfo = nFloor.Cinf
	nFloor2 := Flor2{
		Floor: nFloor.Floor,
	}
	openFloor()
	floors = append(floors, nFloor2)
	tt := []Unt{}
	files := string(Cinfo.Worksite) + "_" + string(nFloor.Floor) + "_units.json"
	file, err := os.Create(files)
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(tt); err != nil {
		panic(err)
	}
	file.Close()
	saveFloor()
	floors = []Flor2{}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func saveFloor() {
	files := string(Cinfo.Worksite) + "_floors.json"
	fmt.Println(files)
	file, err := os.Create(files)
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(floors); err != nil {
		panic(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func delFloor(c *gin.Context) {
	var dFloor Flor
	if err := c.BindJSON(&dFloor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	Cinfo = dFloor.Cinf
	openO()
	for _, item := range orders {
		if item.Floor == dFloor.Floor {
			c.String(200, "no")
			return
		}
	}
	openFloor()
	for i, item := range floors {
		if item.Floor == dFloor.Floor {
			floors = append(floors[:i], floors[i+1:]...)
			break
		}
	}
	files := string(Cinfo.Worksite) + "_" + string(dFloor.Floor) + "_units.json"
	err := os.Remove(files)
	if err != nil {
		return
	}
	saveFloor()
	floors = []Flor2{}
	c.String(200, "ok")
}

// ______________________________________________________________________________________________________________
func editFloor(c *gin.Context) {
	type Flor3 struct {
		OldFloor string `json:"oldFloor"`
		Floor    string `json:"floor"`
		Cinf     Cfo    `json:"Cinfo"`
	}
	var EditF Flor3
	if err := c.BindJSON(&EditF); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	Cinfo = EditF.Cinf
	newFloor := Flor2{
		Floor: EditF.Floor,
	}
	openFloor()
	for i, item := range floors {
		if item.Floor == EditF.OldFloor {
			floors[i] = newFloor
			break
		}
	}
	oldName := string(Cinfo.Worksite) + "_" + string(EditF.OldFloor) + "_units.json"
	newName := string(Cinfo.Worksite) + "_" + string(EditF.Floor) + "_units.json"
	fmt.Println(oldName)
	fmt.Println(newName)
	err := os.Rename(oldName, newName)
	if err != nil {
		return
	}
	saveFloor()
	floors = []Flor2{}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func selectFloor(c *gin.Context) {
	if err := c.BindJSON(&Cinfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func openUnit() {
	files := string(Cinfo.Worksite) + "_" + string(Cinfo.Floor) + "_units.json"
	fmt.Println(files)
	file, err := os.Open(files)
	if err != nil {
		if os.IsNotExist(err) {
			units = []Unt2{}
		}
		panic(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&units); err != nil {
		panic(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func getUnits2(c *gin.Context) {
	openUnit()
	c.JSON(http.StatusOK, gin.H{"units": units})
	units = []Unt2{}
}

// ______________________________________________________________________________________________________________
func getUnits3(c *gin.Context) {
	c.JSON(http.StatusOK, Cinfo)
}

// ______________________________________________________________________________________________________________
func addUnit(c *gin.Context) {
	var nUnit Unt
	if err := c.ShouldBindJSON(&nUnit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	Cinfo = nUnit.Cinf
	nUnit2 := Unt2{
		Unit: nUnit.Unit,
	}
	openUnit()
	units = append(units, nUnit2)
	saveUnit()
	units = []Unt2{}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func saveUnit() {
	files := string(Cinfo.Worksite) + "_" + string(Cinfo.Floor) + "_units.json"
	fmt.Println(files)
	file, err := os.Create(files)
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(units); err != nil {
		panic(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func delUnit(c *gin.Context) {
	var dUnit Unt
	if err := c.BindJSON(&dUnit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	Cinfo = dUnit.Cinf
	openO()
	for _, item := range orders {
		if item.Unit == dUnit.Unit {
			c.String(200, "no")
			return
		}
	}
	openUnit()
	for i, item := range units {
		if item.Unit == dUnit.Unit {
			units = append(units[:i], units[i+1:]...)
			break
		}
	}
	saveUnit()
	units = []Unt2{}
	c.String(200, "ok")
}

// ______________________________________________________________________________________________________________
func editUnit(c *gin.Context) {
	type Unit3 struct {
		OldUnit string `json:"oldUnit"`
		Unit    string `json:"unit"`
		Cinf    Cfo    `json:"Cinfo"`
	}
	var EditU Unit3
	if err := c.BindJSON(&EditU); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	newUnit := Unt2{
		Unit: EditU.Unit,
	}
	openUnit()
	for i, item := range units {
		if item.Unit == EditU.OldUnit {
			units[i] = newUnit
			break
		}
	}
	saveUnit()
	units = []Unt2{}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func selectUnit(c *gin.Context) {
	if err := c.BindJSON(&Cinfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func getParts2(c *gin.Context) {
	c.JSON(http.StatusOK, Cinfo)
}

// ______________________________________________________________________________________________________________
func selectPart(c *gin.Context) {
	if err := c.BindJSON(&Cinfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func getPart(c *gin.Context) {
	c.JSON(http.StatusOK, Cinfo)
}

// ______________________________________________________________________________________________________________
func openO() {
	orders = []Cfo{}
	file, err := os.Open("order.json")
	if err != nil {
		if os.IsNotExist(err) {
			orders = []Cfo{}
		}
		panic(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&orders); err != nil {
		panic(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func saveO() {
	file, err := os.Create("order.json")
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(orders); err != nil {
		panic(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func order(c *gin.Context) {
	var recO []Cfo
	if err := c.BindJSON(&recO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
	openO()
	openHis()
	location, err := time.LoadLocation("America/New_York")
	if err != nil {
		panic(err)
	}
	currentTime := time.Now().In(location)
	for _, item := range recO {
		item.Time = fmt.Sprintf("%s / %s", currentTime.Format("15:04"), currentTime.Format("2006-01-02"))
		item.UniqueID2 = uuid.New().String()
		orders = append(orders, item)
		histories = append(histories, item)
	}
	saveO()
	saveHis()
	Cinfo.Side = ""
	Cinfo.Thickness = ""
	Cinfo.Length = ""
	Cinfo.DA = ""
	Cinfo.DB = ""
	Cinfo.DC = ""
	Cinfo.DD = ""
	Cinfo.DE = ""
	Cinfo.D1A = ""
	Cinfo.D2A = ""
	Cinfo.D1B = ""
	Cinfo.D2B = ""
	Cinfo.DR = ""
	Cinfo.DR_P = ""
	Cinfo.DH = ""
	Cinfo.DW = ""
	Cinfo.Edge1 = ""
	Cinfo.Edge2 = ""
}

// ______________________________________________________________________________________________________________
func addTorder(c *gin.Context) {
	if err := c.BindJSON(&Cinfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
	groupOrders = append(groupOrders, Cinfo)
	Cinfo.Side = ""
	Cinfo.Thickness = ""
	Cinfo.Length = ""
	Cinfo.DA = ""
	Cinfo.DB = ""
	Cinfo.DC = ""
	Cinfo.DD = ""
	Cinfo.DE = ""
	Cinfo.D1A = ""
	Cinfo.D2A = ""
	Cinfo.D1B = ""
	Cinfo.D2B = ""
	Cinfo.DR = ""
	Cinfo.DR_P = ""
	Cinfo.DH = ""
	Cinfo.DW = ""
	Cinfo.Edge1 = ""
	Cinfo.Edge2 = ""
	Cinfo.Price = ""
}

// ______________________________________________________________________________________________________________
func viewCart2(c *gin.Context) {
	var matchingParts []Cfo
	for _, item := range groupOrders {
		if item.User == Cusername {
			matchingParts = append(matchingParts, item)
		}
	}
	c.JSON(http.StatusOK, matchingParts)
}

// ______________________________________________________________________________________________________________
func delCart(c *gin.Context) {
	var delInfo Cfo
	if err := c.BindJSON(&delInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
	for i, item := range groupOrders {
		if item.User == delInfo.User && item.Worksite == delInfo.Worksite &&
			item.Floor == delInfo.Floor && item.Unit == delInfo.Unit &&
			item.Part == delInfo.Part && item.Side == delInfo.Side &&
			item.Thickness == delInfo.Thickness && item.Length == delInfo.Length &&
			item.DA == delInfo.DA && item.DB == delInfo.DB &&
			item.DC == delInfo.DC && item.DD == delInfo.DD &&
			item.DE == delInfo.DE && item.D1A == delInfo.D1A &&
			item.D2A == delInfo.D2A && item.D1B == delInfo.D1B &&
			item.D2B == delInfo.D2B && item.DR == delInfo.DR &&
			item.DR_P == delInfo.DR_P && item.DH == delInfo.DH &&
			item.DW == delInfo.DW && item.Edge1 == delInfo.Edge1 &&
			item.Edge2 == delInfo.Edge2 {
			groupOrders = append(groupOrders[:i], groupOrders[i+1:]...)
			break
		}
	}
}

func sendGroup(c *gin.Context) {
	var group []Cfo
	if err := c.BindJSON(&group); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
	openO()
	location, err := time.LoadLocation("America/New_York")
	if err != nil {
		panic(err)
	}
	currentTime := time.Now().In(location)
	openHis()
	for i := range group {
		group[i].Time = fmt.Sprintf("%s / %s", currentTime.Format("15:04"), currentTime.Format("2006-01-02"))
		group[i].UniqueID2 = uuid.New().String()
	}
	for _, item := range group {
		orders = append(orders, item)
		histories = append(histories, item)
	}
	saveO()
	saveHis()
	histories = append(histories, orders...)
	var indicesToRemove []int

	for _, del := range groupOrders {
		for i, item := range group {
			if item.User == del.User &&
				item.Worksite == del.Worksite &&
				item.Floor == del.Floor &&
				item.Unit == del.Unit &&
				item.Part == del.Part &&
				item.Side == del.Side &&
				item.Thickness == del.Thickness &&
				item.Length == del.Length &&
				item.DA == del.DA &&
				item.DB == del.DB &&
				item.DC == del.DC &&
				item.DD == del.DD &&
				item.DE == del.DE &&
				item.D1A == del.D1A &&
				item.D2A == del.D2A &&
				item.D1B == del.D1B &&
				item.D2B == del.D2B &&
				item.DR == del.DR &&
				item.DR_P == del.DR_P &&
				item.DH == del.DH &&
				item.DW == del.DW &&
				item.Edge1 == del.Edge1 &&
				item.Edge2 == del.Edge2 {
				indicesToRemove = append(indicesToRemove, i)
				break
			}
		}
	}

	// Sort indices in descending order
	sort.Sort(sort.Reverse(sort.IntSlice(indicesToRemove)))

	// Remove identified items
	for _, idx := range indicesToRemove {
		groupOrders = append(groupOrders[:idx], groupOrders[idx+1:]...)
	}
}

// ______________________________________________________________________________________________________________
func getOrders(c *gin.Context) {
	openO()
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
	orders = []Cfo{}
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
	openO()
	for _, del := range delInfo {
		for i, item := range orders {
			if item.UniqueID2 == del.UniqueID2 {
				orders = append(orders[:i], orders[i+1:]...)
				break
			}
		}
	}
	saveO()
}

// ______________________________________________________________________________________________________________
func openHis() {
	file, err := os.Open("history.json")
	if err != nil {
		if os.IsNotExist(err) {
			histories = []Cfo{}
		}
		panic(err)
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&histories); err != nil {
		panic(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func saveHis() {
	file, err := os.Create("history.json")
	if err != nil {
		panic(err)
	}
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(histories); err != nil {
		panic(err)
	}
	file.Close()
}

// ______________________________________________________________________________________________________________
func viewHis1(c *gin.Context) {
	data, err := os.ReadFile("history.html")
	if err != nil {
		return
	}
	floor2_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, floor2_page)
}

// ______________________________________________________________________________________________________________
func viewHis2(c *gin.Context) {
	openHis()
	c.JSON(http.StatusOK, histories)
}

// ______________________________________________________________________________________________________________
func retreiveHis(c *gin.Context) {
	var retInfo Cfo
	if err := c.BindJSON(&retInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
	openO()
	orders = append(orders, retInfo)
	saveO()
}

// ______________________________________________________________________________________________________________
func fractionToDecimal(s string) (float64, error) {
	parts := strings.Split(s, ".")
	if len(parts) == 0 || len(parts) > 2 {
		return 0, fmt.Errorf("Invalid format")
	}

	whole := 0
	var err error
	if len(parts) == 2 {
		whole, err = strconv.Atoi(parts[0])
		if err != nil {
			return 0, err
		}
	}

	fracParts := strings.Split(parts[len(parts)-1], "/")
	if len(fracParts) != 2 {
		return 0, fmt.Errorf("Invalid fraction format")
	}

	numerator, err := strconv.Atoi(fracParts[0])
	if err != nil {
		return 0, err
	}

	denominator, err := strconv.Atoi(fracParts[1])
	if err != nil {
		return 0, err
	}

	if denominator == 0 {
		return 0, fmt.Errorf("Denominator can't be zero")
	}

	return float64(whole) + float64(numerator)/float64(denominator), nil
}

// ______________________________________________________________________________________________________________
func sortSize(c *gin.Context) {
	type Nbrr struct {
		Nbr string `json:"nbr"`
	}
	var nbr Nbrr
	var orders2 []Cfo
	if err := c.BindJSON(&nbr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	intValue, err := strconv.Atoi(nbr.Nbr)
	if err != nil {
		// Handle the error
	}
	fmt.Println(nbr)
	openO()
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
	fmt.Println(orders)
	fmt.Println("")
	fmt.Println("")
	j := len(orders) - intValue
	for i := len(orders) - 1; i >= 0; i-- {
		tmp := 0.0
		processDimension := func(dim string) {
			if dim == "x" || dim == "X" {
				tmp += 48
			} else if val, err := fractionToDecimal(dim); err == nil {
				tmp += val
			} else if intValue, err := strconv.Atoi(dim); err == nil {
				tmp += float64(intValue)
			}
		}
		processDimension(orders[i].D1A)
		processDimension(orders[i].D1B)
		processDimension(orders[i].D2A)
		processDimension(orders[i].D2B)
		processDimension(orders[i].DA)
		processDimension(orders[i].DB)
		processDimension(orders[i].DC)
		processDimension(orders[i].DD)
		processDimension(orders[i].DE)
		processDimension(orders[i].DR)
		processDimension(orders[i].DR_P)
		processDimension(orders[i].DH)
		processDimension(orders[i].DW)
		orders[i].Sum = strconv.Itoa(int(tmp))
		orders2 = append(orders2, orders[i])
		if i == j {
			sort.Slice(orders2, func(i, j int) bool {
				sumI, _ := strconv.Atoi(orders2[i].Sum)
				sumJ, _ := strconv.Atoi(orders2[j].Sum)
				return sumI > sumJ
			})
			orders3 = append(orders3, orders2...)
			j -= intValue
			orders2 = []Cfo{}
		}
	}
	if len(orders2) > 0 {
		sort.Slice(orders2, func(i, j int) bool {
			sumI, _ := strconv.Atoi(orders2[i].Sum)
			sumJ, _ := strconv.Atoi(orders2[j].Sum)
			return sumI > sumJ
		})
		orders3 = append(orders3, orders2...)
	}
	fmt.Println(orders2)
	fmt.Println("")
	fmt.Println("")
	for i, j := 0, len(orders3)-1; i < j; i, j = i+1, j-1 {
		orders3[i], orders3[j] = orders3[j], orders3[i]
	}
	fmt.Println(orders3)
	c.Status(http.StatusOK)
}

// ______________________________________________________________________________________________________________
func sortSize2(c *gin.Context) {
	c.JSON(http.StatusOK, orders3)
	orders3 = []Cfo{}
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
	openHis()
	if retM.Month == "all" {
		if Cinfo.Worksite == "" {
			for _, item := range histories {
				hisM = append(hisM, item)
			}
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
			fmt.Println("Error converting:", err)
			return
		}
		currentMonth := int(time.Now().Month())
		if Cinfo.Worksite == "" {
			if retM2 == 0 {
				for _, item := range histories {
					parsedTime, err := time.Parse("15:04 / 2006-01-02", item.Time)
					if err != nil {
						fmt.Println("Error parsing time:", err)
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
						fmt.Println("Error parsing time:", err)
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
						fmt.Println("Error parsing time:", err)
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
						fmt.Println("Error parsing time:", err)
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
						fmt.Println("Error parsing time:", err)
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
						fmt.Println("Error parsing time:", err)
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
						fmt.Println("Error parsing time:", err)
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
						fmt.Println("Error parsing time:", err)
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
	data, err := os.ReadFile("monthHis.html")
	if err != nil {
		return
	}
	floor2_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, floor2_page)
}

// ______________________________________________________________________________________________________________
func mHis3(c *gin.Context) {
	fmt.Println(hisM)
	c.JSON(http.StatusOK, hisM)
	hisM = []Cfo{}
}

// ______________________________________________________________________________________________________________
func unitProgress1(c *gin.Context) {
	var PgrsData Pgrs
	if err := c.BindJSON(&PgrsData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	c.Status(http.StatusOK)
	openO()
	for i, item := range orders {
		if item.UniqueID2 == PgrsData.Uid2 && PgrsData.Check == "1" && item.Check == "" {
			orders[i].Check = "1"
			break
		} else if item.UniqueID2 == PgrsData.Uid2 && PgrsData.Check == "" && item.Check == "1" {
			orders[i].Check = ""
			break
		}
	}
	saveO()
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
		Time  string `json:"time"` // Assuming you have a time field in the data
	}

	var PgrsData Pgrs3
	var progresses0 []Pgrs4
	if err := c.BindJSON(&PgrsData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	openO()

	randTimes := make(map[string]time.Time)
	for _, item := range orders {
		if item.User == PgrsData.User && item.Worksite == PgrsData.Worksite {
			tmp := Pgrs4{
				Unit:  item.Unit,
				Check: item.Check,
				Rand:  item.Rand,
				Time:  item.Time, // Also store the time
			}
			progresses0 = append(progresses0, tmp)

			parsedTime, err := parseTimeString(item.Time)
			if err != nil {
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

	// Now, loop through sorted RandTimeEntry to append final progress values to progressItems
	for _, entry := range entries {
		rand := entry.Rand
		progress := fmt.Sprintf("%.0f%%", float64(unitProgress[rand])/float64(unitCheckCount[rand])*100)

		// Find the corresponding unit for this rand value from progresses0.
		var unitForRand string
		for _, item := range progresses0 {
			if item.Rand == rand {
				unitForRand = item.Unit
				break
			}
		}

		progressItems = append(progressItems, Pgrs2{Rand: rand, Progress: progress, Unit: unitForRand})
	}

	fmt.Println(progressItems)
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
	data, err := os.ReadFile("adminUser.html")
	if err != nil {
		return
	}
	floor2_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, floor2_page)
}

// ______________________________________________________________________________________________________________
func adminHistory(c *gin.Context) {
	data, err := os.ReadFile("adminHistory.html")
	if err != nil {
		return
	}
	floor2_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, floor2_page)
}

// ______________________________________________________________________________________________________________
func adminWorksite(c *gin.Context) {
	data, err := os.ReadFile("adminWorksite.html")
	if err != nil {
		return
	}
	floor2_page := string(data)
	c.Header("Content-Type", "text/html")
	c.String(http.StatusOK, floor2_page)
}

// ______________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________
func main() {
	loadCred()
	//gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Use(cors.Default())
	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))
	router.GET("/", home)
	router.POST("/login99", login)
	authMiddleware := func(c *gin.Context) {
		// Read the username from the cookie
		username, err := c.Cookie("username4221")
		Cusername = username
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
		Cusername = username
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
	router.POST("/addUser2", authMiddleware3, addUser2)
	router.POST("/delUser2", authMiddleware3, delUser2)
	router.GET("/getCurUser", authMiddleware4, getCurUser)
	router.GET("/getWorksites", authMiddleware4, getWorksites)
	router.POST("/addWorksite", authMiddleware3, addWorksite)
	router.POST("/delWorksite", authMiddleware3, delWorksite)
	router.POST("/editWorksite", authMiddleware3, editWorksite)
	router.POST("/selectWorksite", authMiddleware4, selectWorksite)
	router.GET("/getFloors2", authMiddleware4, getFloors2)
	router.GET("/getFloors3", authMiddleware, getFloors3)
	router.POST("/addFloor", authMiddleware, addFloor)
	router.POST("/delFloor", authMiddleware, delFloor)
	router.POST("/editFloor", authMiddleware, editFloor)
	router.POST("/selectFloor", authMiddleware4, selectFloor)
	router.GET("/getUnits2", authMiddleware4, getUnits2)
	router.GET("/getUnits3", authMiddleware, getUnits3)
	router.POST("/addUnit", authMiddleware, addUnit)
	router.POST("/delUnit", authMiddleware, delUnit)
	router.POST("/editUnit", authMiddleware, editUnit)
	router.POST("/selectUnit", authMiddleware4, selectUnit)
	router.GET("/getParts2", authMiddleware, getParts2)
	router.POST("/selectPart", authMiddleware, selectPart)
	router.GET("/getPart", authMiddleware, getPart)
	router.POST("/order", authMiddleware, order)
	router.POST("/addTorder", authMiddleware, addTorder)
	router.GET("/viewCart2", authMiddleware, viewCart2)
	router.POST("/delCart", authMiddleware, delCart)
	router.POST("/sendGroup", authMiddleware, sendGroup)
	router.GET("/getOrders", authMiddleware2, getOrders)
	router.POST("/delReceive", authMiddleware2, delReceive)
	router.GET("/viewHis1", authMiddleware2, viewHis1)
	router.GET("/viewHis2", authMiddleware2, viewHis2)
	router.POST("/retreiveHis", authMiddleware2, retreiveHis)
	router.POST("/sortSize", authMiddleware2, sortSize)
	router.GET("/sortSize2", authMiddleware2, sortSize2)
	router.POST("/unitProgress1", authMiddleware2, unitProgress1)
	router.POST("/unitProgress2", authMiddleware, unitProgress2)
	router.GET("/unitProgress3", authMiddleware, unitProgress3)
	router.GET("/image1", func(c *gin.Context) {
		c.File("./image1.jpg")
	})
	router.GET("/image2", func(c *gin.Context) {
		c.File("./image2.jpg")
	})
	router.GET("/image3", func(c *gin.Context) {
		c.File("./image3.jpg")
	})
	router.GET("/image4", func(c *gin.Context) {
		c.File("./image4.jpg")
	})
	router.GET("/image5", func(c *gin.Context) {
		c.File("./image5.jpg")
	})
	router.GET("/image6", func(c *gin.Context) {
		c.File("./image6.jpg")
	})
	router.GET("/image7", func(c *gin.Context) {
		c.File("./image7.jpg")
	})
	router.GET("/image8", func(c *gin.Context) {
		c.File("./image8.jpg")
	})
	router.GET("/image9", func(c *gin.Context) {
		c.File("./image9.jpg")
	})
	router.GET("/image10", func(c *gin.Context) {
		c.File("./image10.jpg")
	})
	router.GET("/image11", func(c *gin.Context) {
		c.File("./image11.jpg")
	})
	router.GET("/image12", func(c *gin.Context) {
		c.File("./image12.jpg")
	})
	router.GET("/image13", func(c *gin.Context) {
		c.File("./image13.jpg")
	})
	router.GET("/image14", func(c *gin.Context) {
		c.File("./image14.jpg")
	})
	router.GET("/image15", func(c *gin.Context) {
		c.File("./image15.jpg")
	})
	numImages := 14
	for i := 1; i <= numImages; i++ {
		index := i // Capture the current value of i in a local variable
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

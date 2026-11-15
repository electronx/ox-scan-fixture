// INTENTIONALLY INSECURE TEST FIXTURE — never build or run.
package main

import (
	"crypto/md5"
	"crypto/tls"
	"database/sql"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"os/exec"
)

var db *sql.DB

const apiSecret = "placeholder-not-a-real-secret-123"

func findUser(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	rows, _ := db.Query("SELECT * FROM users WHERE id = '" + id + "'")
	defer rows.Close()
}

func ping(w http.ResponseWriter, r *http.Request) {
	host := r.FormValue("host")
	out, _ := exec.Command("sh", "-c", "ping -c 1 "+host).Output()
	w.Write(out)
}

func download(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("file")
	data, _ := os.ReadFile("/var/data/" + name)
	w.Write(data)
}

func fetch(w http.ResponseWriter, r *http.Request) {
	resp, _ := http.Get(r.URL.Query().Get("url"))
	defer resp.Body.Close()
}

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hello %s</h1>", r.URL.Query().Get("name"))
}

func client() *http.Client {
	return &http.Client{Transport: &http.Transport{TLSClientConfig: &tls.Config{InsecureSkipVerify: true}}}
}

func hashPassword(pw string) []byte {
	h := md5.New()
	h.Write([]byte(pw))
	return h.Sum(nil)
}

func resetToken() int { return rand.Intn(1000000) }

func main() {}

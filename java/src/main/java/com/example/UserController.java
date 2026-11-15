// INTENTIONALLY INSECURE TEST FIXTURE — never build or run.
package com.example;

import java.io.File;
import java.io.ObjectInputStream;
import java.net.URL;
import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.Statement;
import java.util.Random;
import javax.crypto.Cipher;
import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilderFactory;

public class UserController {
    private static final String DB_PASSWORD = "placeholder-not-a-real-password";
    private Connection conn;

    public void findUser(HttpServletRequest request) throws Exception {
        String id = request.getParameter("id");
        Statement st = conn.createStatement();
        st.executeQuery("SELECT * FROM users WHERE id = '" + id + "'");
    }

    public void ping(HttpServletRequest request) throws Exception {
        Runtime.getRuntime().exec("ping -c 1 " + request.getParameter("host"));
    }

    public File download(HttpServletRequest request) {
        return new File("/var/data/" + request.getParameter("file"));
    }

    public void fetch(HttpServletRequest request) throws Exception {
        new URL(request.getParameter("url")).openStream();
    }

    public Object load(ObjectInputStream in) throws Exception {
        return in.readObject();
    }

    public void parse(String xml) throws Exception {
        DocumentBuilderFactory.newInstance().newDocumentBuilder();
    }

    public byte[] hash(String pw) throws Exception {
        return MessageDigest.getInstance("MD5").digest(pw.getBytes());
    }

    public Cipher cipher() throws Exception {
        return Cipher.getInstance("DES/ECB/PKCS5Padding");
    }

    public int resetToken() {
        return new Random().nextInt();
    }
}

package pl.dmcs.gamesapp.model;

public class Token {

    private String token;

    public Token() {
    }

    public Token(String token) {
        this.token = token;
    }

    public static Token of(String token) {
        return new Token(token);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

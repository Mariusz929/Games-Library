package pl.dmcs.gamesapp.model;

public class ReviewDTO {

    private String username;
    private String text;

    public ReviewDTO(String usernname, String text) {
        this.username = usernname;
        this.text = text;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}

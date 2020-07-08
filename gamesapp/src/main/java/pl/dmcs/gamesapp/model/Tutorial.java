package pl.dmcs.gamesapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "tutorial")
public class Tutorial {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    @ManyToOne(fetch = FetchType.LAZY)
    private AppUser user;
    @ManyToOne(fetch = FetchType.LAZY)
    private Game game;
    @Lob
    private String pdfFile;

    public Tutorial() {
    }

    public Tutorial(String title, Game game, AppUser user, String pdfFile) {
        this.title = title;
        this.game = game;
        this.user = user;
        this.pdfFile = pdfFile;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @JsonIgnore
    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    @JsonIgnore
    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public String getPdfFile() {
        return pdfFile;
    }

    public void setPdfFile(String pdfFile) {
        this.pdfFile = pdfFile;
    }
}

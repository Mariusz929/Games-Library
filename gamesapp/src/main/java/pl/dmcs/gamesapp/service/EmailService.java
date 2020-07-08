package pl.dmcs.gamesapp.service;

public interface EmailService{
    public void sendMessage(String to, String subject, String text);
}


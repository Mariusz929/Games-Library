package pl.dmcs.gamesapp.service;

import java.util.List;

interface CRUDService<T extends Object> {

    void addOne(T t);

    void addAll(List<T> t);

    T getOne(long id);

    List<T> getAll();

    void updateOne(T t);

    void deleteOne(T t);

    void deleteAll(List<T> t);

}

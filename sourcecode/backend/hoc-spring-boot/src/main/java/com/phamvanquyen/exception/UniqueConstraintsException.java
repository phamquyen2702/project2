package com.phamvanquyen.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT)
public class UniqueConstraintsException extends Exception {
    private static final long serialVersionUID = 1L;

    public UniqueConstraintsException(String message) {
	super(message);
    }

}

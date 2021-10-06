package com.koopey.api.model.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import lombok.Data;

@Data
public class UserRegisterDto implements Serializable {
       
    private String alias;
    private String avatar;  
    private Date birthday;  
    private String email; 
    private String mobile;
    private String name;  
    private String password; 
    private String language;
    private String timeZone;        
    private Boolean gdpr;
    private Boolean cookie;
    private Set<LocationDto> locations;
  
}

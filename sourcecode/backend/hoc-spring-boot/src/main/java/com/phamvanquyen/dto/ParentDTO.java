package com.phamvanquyen.dto;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ParentDTO implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String createBy;
    private String createDate;
    private String modifiedBy;
    private String modifiedDate;

    SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");

    public String getCreateBy() {
	return createBy;
    }

    public void setCreateBy(String createBy) {
	this.createBy = createBy;
    }

    public String getCreateDate() {
	return createDate;
    }

    public void setCreateDate(Date createDate) {
	this.createDate = df.format(createDate);
    }

    public String getModifiedBy() {
	return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
	this.modifiedBy = modifiedBy;
    }

    public String getModifiedDate() {
	return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
	this.modifiedDate = df.format(modifiedDate);
    }

}

package com.phamvanquyen.transfer;

import org.springframework.stereotype.Component;

import com.phamvanquyen.dto.ParentDTO;
import com.phamvanquyen.entity.ParentEntity;

@Component
public class ParentUtil {
    public void converter(ParentEntity entity, ParentDTO dto) {
	dto.setCreateBy(entity.getCreateBy());
	dto.setCreateDate(entity.getCreateDate());
	dto.setModifiedBy(entity.getModifiedBy());
	dto.setModifiedDate(entity.getModifiedDate());
    }

    public void converterEntity(ParentEntity entity, ParentDTO dto) {
	entity.setCreateBy(dto.getCreateBy());
	entity.setModifiedBy(dto.getModifiedBy());
    }
}

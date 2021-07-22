package com.koopey.api.model;

import com.google.common.base.MoreObjects;
import java.io.Serializable;
import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Column;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@SuperBuilder
@Table(name = "article")
public class Article extends BaseEntity {

    private static final long serialVersionUID = 7523090550210573431L;

    // @Column(name = "avatar")
    // private String images = "";

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "provider_id", nullable = false)
    private User provider;

    // @Override
    // public String toString() {
    // return MoreObjects.toStringHelper(this).add("id", id).add("client",
    // client.getName())
    // .add("provider", provider.getName()).add("publish", publishDate).toString();
    // }
}
create table if not exists worker(
                          id int primary key,
                          name varchar(255)not null,
                          phone varchar(20),
                          sex varchar(255)
                      )

create table if not exists order(
                          id int primary key,
                          vehicle varchar(255)not null,
                          type varchar(20),
                          amount varchar(200),
                          work_date timestamp DEFAULT NULL
                      )

create table if not exists dict(
                          id int primary key,
                          code varchar(255)not null,
                          value varchar(20)not null,
                          type varchar(200)not null
                      )

create table if not exists worker_order(
                          id int primary key,
                          worker_id varchar(255)not null,
                          order_id varchar(200)not null,
                          amount varchar(200)not null
                      )
create table if not exists `users`(
                                      id INT NOT NULL AUTO_INCREMENT,
                                      name VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    avator VARCHAR(100)  COMMENT '头像',
    moment VARCHAR(100) NOT NULL COMMENT '注册时间',
    PRIMARY KEY ( id )
    );

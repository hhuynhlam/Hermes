CREATE TABLE Users 
(
    id              int NOT NULL,
    firstName       varchar(255),
    lastName        varchar(255),
    streetAddress   varchar(255),
    country         varchar(2),
    state           varchar(2),
    city            varchar(255),
    zip             varchar(5),
    homePhone       varchar(10),
    mobilePhone     varchar(10),
    email           varchar(255) NOT NULL,
    password        varchar(255) NOT NULL,
    PRIMARY KEY (id)
)
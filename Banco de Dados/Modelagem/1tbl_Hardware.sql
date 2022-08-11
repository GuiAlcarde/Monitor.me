create table tbl_Hardware(
IdHardware int primary key identity,
Modelo varchar(60),
MemoriaRam varchar(45),
DiscoRigido varchar(45),
GPU varchar(45),
--Id_IdUsers int
--foreign key (Id_IdUsers) references tbl_Users(IdUsers)
)
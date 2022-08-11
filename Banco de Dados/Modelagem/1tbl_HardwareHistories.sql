create table tbl_HardwareHistories(
IdHardwareHistories int primary key identity,
Data date,
OshiStatus varchar(255),
GPUStatus varchar(255),
Id_IdHardware int
foreign key (Id_IdHardware) references tbl_Hardware(IdHardware)
)

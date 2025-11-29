# Barberia Entre Cabellos# Menu Barberia Entre Cabellos# Menú y Jerarquía - Barbería Entre Cabellosflowchart TDgraph TDgraph TD



```mermaid

flowchart TD

    A[Barberia]## Diagrama de Navegacion

    B[Inicio]

    C[Servicios]

    D[Productos]

    E[Reserva]```mermaid## Estructura de Navegación    A[Barberia Entre Cabellos]

    F[Contacto]

    G[Reservar]flowchart TD

    

    E1[Servicio]    A["Barberia"]

    E2[Barbero]

    E3[Confirmar]    

    E4[Pagar]

        B["Inicio"]```mermaid        A[Barbería Entre Cabellos]    %% Nodo Raíz del Sistema

    A --> B

    A --> C    C["Servicios"]  

    A --> D

    A --> E    D["Productos"]flowchart TD

    A --> F

    A --> G    E["Reserva"]

    

    E --> E1    F["Contacto"]    A[Barberia Entre Cabellos]    B[Inicio]

    G --> E1

    E1 --> E2    G["Boton Reservar"]

    E2 --> E3

    E3 --> E4        

```
    E1["Paso 1: Servicio"]

    E2["Paso 2: Barbero"]    B[Inicio]    C[Servicios]          A[SITIO WEB: Barbería Entre Cabellos]

    E3["Paso 3: Confirmar"]

    E4["Paso 4: Pagar"]    C[Servicios]  

    

    A --> B    D[Productos]    D[Productos]

    A --> C

    A --> D    E[Reserva]

    A --> E

    A --> F    F[Contacto]    E[Reserva]    B[Inicio]

    A --> G

        G[Reservar Ahora]

    E --> E1

    G --> E1        F[Contacto]

    E1 --> E2

    E2 --> E3    E1[Seleccionar Servicio]

    E3 --> E4

```    E2[Elegir Barbero]    G[Reservar Ahora]    C[Servicios]    subgraph Menu [" Menú Principal "]



## Descripcion    E3[Confirmar Reserva]



**Menu Principal:**    E4[Pagar]    

- Inicio: Pagina principal

- Servicios: Lista de cortes    

- Productos: Galeria de productos

- Reserva: Sistema de citas    A --> B    E1[Seleccionar Servicio]    D[Productos]        B(Inicio)

- Contacto: Informacion

- Boton Reservar: Acceso rapido    A --> C



**Proceso de Reserva:**    A --> D    E2[Elegir Barbero]

1. Seleccionar servicio

2. Elegir barbero y hora    A --> E

3. Confirmar datos

4. Realizar pago    A --> F    E3[Confirmar Reserva]    E[Reserva]        C(Servicios)

    A --> G

        E4[Pagar]

    E --> E1

    G --> E1        F[Contacto]        D(Productos)

    E1 --> E2

    E2 --> E3    A --> B

    E3 --> E4

```    A --> C    G[Reservar Ahora]        E(Reserva)



## Descripción del Flujo    A --> D



### Menú Principal    A --> E            F(Contacto)

- **Inicio**: Página principal con información general

- **Servicios**: Catálogo de cortes y tratamientos    A --> F

- **Productos**: Galería de productos disponibles

- **Reserva**: Sistema de agendamiento    A --> G    E1[1. Seleccionar Servicio]        G[Botón: Reservar Ahora]

- **Contacto**: Información y ubicación

- **Reservar Ahora**: Botón de acceso directo    



### Proceso de Reserva    E --> E1    E2[2. Elegir Barbero]    end

1. **Seleccionar Servicio**: El cliente elige el tipo de corte

2. **Elegir Barbero**: Selección de profesional y horario    G --> E1

3. **Confirmar Reserva**: Revisión de datos y confirmación

4. **Pagar**: Proceso de pago online    E1 --> E2    E3[3. Confirmar Reserva]

    E2 --> E3

    E3 --> E4    E4[4. Pagar]    subgraph FlujoPago [" Flujo de Reserva "]

            E1(1. Seleccionar Servicio)

    A --> B        E2(2. Elegir Barbero y Horario)

    A --> C        E3(3. Confirmación / Resumen)

    A --> D        E4(4. Pago Anticipado)

    A --> E    end

    A --> F

    A --> G    %% Conexiones del menú principal

        A --> B

    E --> E1    A --> C

    G --> E1    A --> D

    E1 --> E2    A --> E

    E2 --> E3    A --> F

    E3 --> E4    A --> G

    %% Flujo secuencial de reserva
    E --> E1
    E1 --> E2
    E2 --> E3
    E3 --> E4

    %% Acceso directo desde el botón
    G --> E1

    %% Estilos visuales
    style A fill:#FFEE58,stroke:#333
    style E1 fill:#FFC107
    style E2 fill:#FFC107
    style E3 fill:#FFC107
    style E4 fill:#FFC107
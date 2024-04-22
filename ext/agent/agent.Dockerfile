# FROM golang:1.22-alpine

# WORKDIR /agent
# COPY agent/go.* .
# COPY agent/. .

# RUN go install github.com/cosmtrek/air@latest

# COPY go.mod go.sum ./
# RUN go mod download

# CMD ["air", "-c", ".air.toml"]


FROM golang:1.22-alpine

WORKDIR /app

RUN go install github.com/cosmtrek/air@latest

COPY go.mod go.sum ./
RUN go mod download

CMD ["air", "-c", ".air.toml"]

# docker-signalone


## Overview
Signal0ne docker extension is a tool for debugging and monitoring containerized apps, which enables automated insights about failed containers and containers affected by resource usage anomalies.

## How to use locally

### Prerequisites
- Docker with compose
- Docker Desktop client
- Make

### Env variables

```
cp ext/agent/.env.template ext/agent/.default.env
```

### Extension

**For Building:**

```
#Build extension(both agent and frontend)
make --directory=./ext build-extension

#Run extension on your local docker desktop environment
make --directory=./ext install-extension-local
```

### Simulated development environment

```
make --directory=./ext start-devenv
```

## Reporting issues

Please report issues using "Issues" github repository tab. Do not duplicate issues.

## Contributing
To contribute to this project start by browsing through open issues. If you find any issue you can help with do a fork and create a pull request.

## License
MIT
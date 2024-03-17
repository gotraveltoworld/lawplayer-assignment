

## Description

Based on [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm install
```

## Running the app and setup your environment variables at first

How to set up this application on your localhost? The following steps bring you to step by step.

1. Make sure your node version is `v20.11.0`.
2. Install libraries by `npm install`.

MACOS
After you have set the project up, the followings steps can help you to run it on localhost.

### Linux Or MACOS

1. Set credentials via environment variable(On linux or MACOS).

    ```bash
    export IMGUR_CLIENT_ID=<clientID>
    ```
2. Run the application by `npm run start:dev`, it will be running.

### Windows

1. Set credentials via environment variable(On linux or MACOS).

    ```shell
    set IMGUR_CLIENT_ID=<clientID>
    ```
2. Run the application by `npm run start:dev`, it will be running.

## Running the app by docker-compose
```bash
IMGUR_CLIENT_ID=<Your CLIENT_ID> docker-compose up
# or runs on background.
IMGUR_CLIENT_ID=<Your CLIENT_ID> docker-compose up -d
```

## API
Postman Collection
```JSON
{
	"info": {
		"_postman_id": "b657652e-f051-4619-9cba-05df8413eb3a",
		"name": "Lawplayer",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "18854559"
	},
	"item": [
		{
			"name": "posts",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"coverUrl\": \"https://i.imgur.com/n744BL9.png\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{host}}/posts",
					"host": [
						"{{host}}"
					],
					"path": [
						"posts"
					]
				}
			},
			"response": []
		},
		{
			"name": "posts",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{host}}/posts",
					"host": [
						"{{host}}"
					],
					"path": [
						"posts"
					]
				}
			},
			"response": []
		}
	],
	"auth": {
		"type": "bearer",
		"bearer": [
			{
				"key": "token",
				"value": "{{accessToken}}",
				"type": "string"
			}
		]
	},
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "host",
			"value": "http://localhost:3000",
			"type": "string"
		},
		{
			"key": "accessToken",
			"value": ""
		}
	]
}
```

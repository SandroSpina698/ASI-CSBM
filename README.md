# ASI-CSBM


# Back

## Diagramme d'architecture
![](doc/archi-schema.drawio.png)

*Remarques: Tous nos microservices sont en Springboot*


## Diagramme de séquence 
![](doc/sequence-schema.drawio.png)

## Démarrer le back

````bash
cd back
# Modifier la ligne suivante : external.iaimgapi.token=yourtoken avec votre token
docker compose up -d
curl http://localhost:11434/api/pull -d '{"name": "qwen2:0.5b"}'
````

Quelques API:
- /api/card-generation/generate
- /api/job
- /api/users
- ...
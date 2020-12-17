## reshuffle-elasticsearch-connector

[Code](https://github.com/reshufflehq/reshuffle-elasticsearch-connector) |  [npm](https://www.npmjs.com/package/reshuffle-elasticsearch-connector) | [Code sample](https://github.com/reshufflehq/reshuffle/tree/master/examples/elasticsearch)

`npm install reshuffle-elasticsearch-connector`

This connector uses [Elasticsearch Node JS Client](https://www.npmjs.com/package/@elastic/elasticsearch) package.


### Reshuffle Elasticsearch Connector

This package contains a Reshuffle connector for connecting to [Elasticsearch](https://www.elastic.co/elasticsearch/).

The following example add a new entry to an existing index:
```js
const { Reshuffle } = require('reshuffle')
const { ElasticsearchConnector } = require('reshuffle-elasticsearch-connector')

const elasticsearchOptions = {
  cloud: {
    id:
      '<name>:<id>',
  },
  auth: {
    username: '<username>',
    password: '<password>',
  },
}

const app = new Reshuffle()
const connector = new Elasticsearch(app, elasticsearchOptions)

app.start()

connector.sdk().index({
  index: 'game-of-thrones',
  body: {
    character: 'Daenerys Targaryen',
    quote: 'I am the blood of the dragon.'
  }
})
```

### Table of Contents

[Setup Cloud elasticsearch](#setup)

[Configuration Options](#configuration)

#### Connector Events

N/A

#### Connector Actions

[SDK](#sdk) - Retrieve a Node JS Elasticsearch client

[Examples using the SDK](#sdk)

#### <a name="setup"></a>Setup Cloud Elasticsearch
Setup Elastic cloud:

1. Go to https://cloud.elastic.co/home
2. Click `Create deployment`
3. Provide a name and create
4. Copy the username/password   
4. Click on your deployment in the deployment list
5. copy the cloud ID which is <deployment-name>:<key>
6. See [Configuration Options](#configuration) below on how to connect to this Elasticsearch cloud instance.

#### <a name="configuration"></a>Configuration Options

The Elasticsearch connector takes the same options as the Node JS Elasticsearch client.
See [Node JS Elasticsearch Client options](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html)

As an example, for connecting to elasticsearch cloud, provide options as below:

```typescript
import ElasticsearchConnector from "./index";

const connector = new ElasticsearchConnector(app, {
  cloud: {
    id:
      '<deployment-name>:<key>', // Cloud ID (see Setup Cloud Elasticsearch above for obtaining this id)
  },
  auth: {
    username: '<username>',
    password: '<password>',
  },
})
```

#### Connector actions

All actions are provided via the sdk.
// See full list of actions documentations in [Node JS Elasticsearch Client API reference](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reference)

##### <a name="sdk"></a>SDK

Return a Node Elasticsearch Client

```typescript
const sdk = await connector.sdk()
```

##### <a name="examples"></a>Examples using the SDK

- Search entries
```typescript
const entries = await connector.sdk().search({
  index: 'my-index',
  from: 20,
  size: 10,
  body: { foo: 'bar' }
}, {
  ignore: [404],
  maxRetries: 3
})
```

- Add entry
```typescript
await connector.sdk().index({
  index: 'game-of-thrones',
  body: {
    character: 'Ned Stark',
    quote: 'Winter is coming.'
  }
})
```

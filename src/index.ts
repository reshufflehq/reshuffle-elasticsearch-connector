import { Reshuffle, BaseConnector } from 'reshuffle-base-connector'
import { Client, ClientOptions } from '@elastic/elasticsearch'

export default class ElasticsearchConnector extends BaseConnector<ClientOptions, null> {
  private readonly client: Client

  constructor(app: Reshuffle, options?: ClientOptions, id?: string) {
    super(app, options, id)
    this.client = new Client(options)
  }

  onStart(): void {
    this.client.ping((error) => {
      if (error) {
        console.error('Reshuffle Elasticsearch Connector - connection failed', this.configOptions)
      } else {
        console.log('Reshuffle Elasticsearch Connector - Elasticsearch is connected')
      }
    })
  }

  sdk(): Client {
    return this.client
  }
}

export { ElasticsearchConnector }

import { Kafka } from "kafkajs"
import { randomUUID } from "node:crypto"

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'test-producer',
    brokers: ['simple-eel-10440-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'c2ltcGxlLWVlbC0xMDQ0MCQ97cPkzzRj7ykpEC_Qv0ZkMxBfvHLat_K3op1w4FQ',
      password: 'i0XKvwfFhFX0CEBSZ-0L1xnJ2PEFuUKKpb66YNaG4g1DugiElwAgDUVnhi-0R2GRlAA0_w=='
    },
    ssl: true,
  })


  const producer = kafka.producer()

  await producer.connect()

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação',
          category: 'social',
          recipientId: randomUUID()
        })
      }
    ]
  })

  await producer.disconnect()
}

bootstrap()
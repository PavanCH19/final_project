import * as lp from 'it-length-prefixed'
import map from 'it-map'
import { pipe } from 'it-pipe'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

/**
 * Sends a message to the given stream.
 * If a predefined message is provided, it sends that instead of reading from stdin.
 */
export function stdinToStream(stream, message = null) {
  if (message) {
    // Send a predefined message
    pipe(
      [uint8ArrayFromString(message)],
      (source) => lp.encode(source),
      stream.sink
    )
  } else {
    // Read from stdin if no message is provided
    process.stdin.setEncoding('utf8')
    pipe(
      process.stdin,
      (source) => map(source, (string) => uint8ArrayFromString(string.trim())), // Trim to clean up extra spaces/newlines
      (source) => lp.encode(source),
      stream.sink
    )
  }
}

/**
 * Reads and displays incoming messages from a stream.
 */
export function streamToConsole(stream) {
  pipe(
    stream.source,
    (source) => lp.decode(source),
    (source) => map(source, (buf) => uint8ArrayToString(buf.subarray())),
    async function (source) {
      for await (const msg of source) {
        const formattedMsg = msg.toString().replace(/\n/g, '') // Clean newlines
        console.log(`📩 Received: ${formattedMsg}`)
      }
    }
  )
}

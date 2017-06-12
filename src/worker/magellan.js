export default class MagellanWorker {
  constructor({ nightwatch }) {
    this.nightwatch = nightwatch;
  }

  emitMetadata(metadata) {
    /* istanbul ignore if */
    // nightwatch will add response from /session to capabilities
    // we need that info to compose the result sometimes
    /*
      metadata: {
        sessionId: sessionId
        capabilities: capabilities
      }
     */
    if (process.send) {
      // notice: each executor will generate report url by itself
      //         only meta data is emitted here

      process.send({
        type: "test-meta-data",
        metadata
      });
    }
  }

  handleMessage(message) {
    /* istanbul ignore if */
    if (message && message.signal === "bail") {
      this.nightwatch.assert.equal(false, true, message.customMessage || "Test killed.");
    }
  }
}

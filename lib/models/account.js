'use strict';

class AWSAccount {
  constructor(accountId, displayName) {
    this.id = accountId;
    this.displayName = displayName;
    this.accessKeys = new Map();
  }

  createKeyPair(accessKeyId, secretAccessKey) {
    AWSAccount.registry.set(accessKeyId, this);
    this.accessKeys.set(accessKeyId, secretAccessKey);
  }

  revokeAccessKey(accessKeyId) {
    AWSAccount.registry.delete(accessKeyId);
    this.accessKeys.delete(accessKeyId);
  }
}
AWSAccount.registry = new Map();

exports = module.exports = AWSAccount;

// Hardcoded dummy user used for authenticated requests
exports.DUMMY_ACCOUNT = new AWSAccount(123456789000, 'S3rver');

// Function to configure the dummy account with custom credentials
exports.configureDummyAccount = function (accessKey, secretKey) {
  // Clear registry completely
  AWSAccount.registry.clear();
  exports.DUMMY_ACCOUNT.accessKeys.clear();

  // Create new key pair
  exports.DUMMY_ACCOUNT.createKeyPair(
    accessKey || 'S3RVER',
    secretKey || 'S3RVER',
  );
};

// Set default credentials initially
exports.DUMMY_ACCOUNT.createKeyPair('S3RVER', 'S3RVER');

import { Injectable, Logger } from '@nestjs/common';
import {
  createAgent,
  IDIDManager,
  IResolver,
  IDataStore,
  IKeyManager,
} from '@veramo/core';
import { DIDManager } from '@veramo/did-manager';
import { EthrDIDProvider } from '@veramo/did-provider-ethr';
import { KeyManager } from '@veramo/key-manager';
import { KeyManagementSystem } from '@veramo/kms-local';
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { getResolver as ethrDidResolver } from 'ethr-did-resolver';
import { Resolver } from 'did-resolver';
import { CredentialPlugin, ICredentialPlugin } from '@veramo/credential-w3c';

// NOTE: In a real application, you would use a persistent data store.
import { MemoryKeyStore, MemoryDIDStore, MemoryPrivateKeyStore } from '@veramo/key-manager';

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || 'dummy-project-id';

@Injectable()
export class DIDService {
  private readonly logger = new Logger(DIDService.name);
  private agent: any; // Use proper types in full implementation

  constructor() {
    this.initializeAgent();
  }

  /**
   * Initializes the Veramo Agent with ethr DID provider.
   */
  private initializeAgent() {
    try {
      this.agent = createAgent<IDIDManager & IKeyManager & IDataStore & IResolver & ICredentialPlugin>({
        plugins: [
          new KeyManager({
            store: new MemoryKeyStore(),
            kms: {
              local: new KeyManagementSystem(new MemoryPrivateKeyStore()),
            },
          }),
          new DIDManager({
            store: new MemoryDIDStore(),
            defaultProvider: 'did:ethr:goerli',
            providers: {
              'did:ethr:goerli': new EthrDIDProvider({
                defaultKms: 'local',
                network: 'goerli',
                rpcUrl: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
              }),
            },
          }),
          new DIDResolverPlugin({
            resolver: new Resolver({
              ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
            }),
          }),
          new CredentialPlugin(),
        ],
      });
      this.logger.log('Veramo agent initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Veramo agent', error);
      throw error;
    }
  }

  /**
   * Creates a new DID for a user.
   * @param userId The ID of the user.
   * @returns The generated DID document identifier.
   */
  async createDID(userId: string): Promise<string> {
    try {
      const identifier = await this.agent.didManagerCreate({
        alias: userId,
        provider: 'did:ethr:goerli',
      });
      this.logger.log(`Created DID for user ${userId}: ${identifier.did}`);
      return identifier.did;
    } catch (error) {
      this.logger.error(`Error creating DID for user ${userId}`, error);
      throw error;
    }
  }

  /**
   * Resolves a DID string to a DID document.
   * @param did The DID string to resolve.
   * @returns The resolved DID Document.
   */
  async resolveDID(did: string): Promise<any> {
    try {
      const resolution = await this.agent.resolveDid({ didUrl: did });
      if (resolution.didResolutionMetadata.error) {
        throw new Error(resolution.didResolutionMetadata.error);
      }
      return resolution.didDocument;
    } catch (error) {
      this.logger.error(`Error resolving DID ${did}`, error);
      throw error;
    }
  }

  /**
   * Issues a W3C Verifiable Credential.
   * @param issuerDid The DID of the issuer.
   * @param subjectDid The DID of the subject.
   * @param claims The claims to include in the credential.
   * @returns The Verifiable Credential in JWT format.
   */
  async issueVerifiableCredential(issuerDid: string, subjectDid: string, claims: any): Promise<any> {
    try {
      const identifier = await this.agent.didManagerGet({ did: issuerDid });
      
      const verifiableCredential = await this.agent.createVerifiableCredential({
        credential: {
          issuer: { id: issuerDid },
          credentialSubject: {
            id: subjectDid,
            ...claims,
          },
        },
        proofFormat: 'jwt',
        save: false,
      });

      this.logger.log(`Issued Verifiable Credential from ${issuerDid} to ${subjectDid}`);
      return verifiableCredential;
    } catch (error) {
      this.logger.error(`Error issuing Verifiable Credential from ${issuerDid}`, error);
      throw error;
    }
  }

  /**
   * Verifies a Verifiable Credential.
   * @param jwt The JWT string of the Verifiable Credential.
   * @returns A boolean indicating if the credential is valid.
   */
  async verifyCredential(jwt: string): Promise<boolean> {
    try {
      const result = await this.agent.verifyCredential({ credential: jwt });
      return result.verified;
    } catch (error) {
      this.logger.error('Error verifying credential', error);
      return false;
    }
  }
}

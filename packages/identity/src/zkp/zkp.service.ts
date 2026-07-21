import { Injectable, Logger } from '@nestjs/common';
import * as snarkjs from 'snarkjs';

@Injectable()
export class ZKPService {
  private readonly logger = new Logger(ZKPService.name);

  // Placeholder paths - these would point to actual files in a real deployment
  private readonly defaultCircuitWasm = 'path/to/circuit.wasm';
  private readonly defaultProvingKey = 'path/to/circuit_final.zkey';
  private readonly defaultVerificationKey = 'path/to/verification_key.json';

  /**
   * Generates a Zero-Knowledge Proof for enrollment without revealing the matriculation number.
   * @param studentId The internal ID of the student.
   * @param enrollmentData The data to prove enrollment for.
   * @param circuitWasm Path to the circuit WASM file.
   * @param provingKey Path to the proving key (zkey).
   * @returns The generated proof and public signals.
   */
  async generateProof(
    studentId: string,
    enrollmentData: any,
    circuitWasm: string = this.defaultCircuitWasm,
    provingKey: string = this.defaultProvingKey,
  ): Promise<{ proof: any; publicSignals: any }> {
    try {
      // In a real scenario, inputs are derived from studentId and enrollmentData
      const input = {
        studentId: studentId,
        enrollmentHash: enrollmentData.hash, // Example
        matriculationNumber: enrollmentData.matriculationNumber, // This is kept private by the circuit
      };

      this.logger.debug(`Generating ZKP for student ${studentId}`);

      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        circuitWasm,
        provingKey,
      );

      this.logger.log(`Successfully generated proof for student ${studentId}`);
      return { proof, publicSignals };
    } catch (error) {
      this.logger.error(`Failed to generate ZKP for student ${studentId}`, error);
      throw error;
    }
  }

  /**
   * Verifies a Zero-Knowledge Proof.
   * @param proof The generated proof.
   * @param publicSignals The public signals output by the prover.
   * @param verificationKey Path or object of the verification key.
   * @returns A boolean indicating if the proof is valid.
   */
  async verifyProof(
    proof: any,
    publicSignals: any,
    verificationKey: string | object = this.defaultVerificationKey,
  ): Promise<boolean> {
    try {
      let vKey = verificationKey;
      if (typeof verificationKey === 'string') {
        // Load the verification key from file or URL
        // Example: vKey = JSON.parse(fs.readFileSync(verificationKey, 'utf8'));
      }

      this.logger.debug('Verifying ZKP...');
      const isValid = await snarkjs.groth16.verify(
        vKey,
        publicSignals,
        proof,
      );

      this.logger.log(`Proof verification result: ${isValid}`);
      return isValid;
    } catch (error) {
      this.logger.error('Error verifying ZKP', error);
      return false;
    }
  }
}

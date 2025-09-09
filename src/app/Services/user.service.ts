import { inject, Injectable } from '@angular/core';
import { Firestore, doc, collection, collectionData, updateDoc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { UserProfile } from '../interfaces/UserProfile';
@Injectable({
  providedIn: 'root'
})
export class UserService {

 // 1. Injetamos o Firestore ao invés do Database
  private firestore: Firestore = inject(Firestore);
  // 2. Criamos uma referência para a coleção de 'users'
  private usersCollection = collection(this.firestore, 'users');

  /**
   * Busca todos os perfis de usuário do Firestore.
   * @returns Um Observable com um array de perfis de usuário.
   */
  getAllUsers(): Observable<UserProfile[]> {
    // 3. Usamos collectionData para obter todos os documentos da coleção
    // O { idField: 'uid' } mapeia o ID do documento para a propriedade 'uid' do objeto
    return collectionData(this.usersCollection, { idField: 'uid' }) as Observable<UserProfile[]>;
  }
  
  /**
   * Atualiza os dados de um perfil de usuário específico no Firestore.
   * @param uid O ID do usuário a ser atualizado.
   * @param data Os dados parciais do perfil a serem mesclados.
   * @returns Um Observable que completa quando a atualização é bem-sucedida.
   */
  updateUserProfile(uid: string, data: Partial<UserProfile>): Observable<void> {
    // 4. Criamos uma referência ao documento específico do usuário
    const userDocRef = doc(this.firestore, `users/${uid}`);
    // 5. Usamos updateDoc para atualizar os dados do documento
    return from(updateDoc(userDocRef, data));
  }

}
import React from 'react'

export default function Formulaire() {
  return (
    <div>
    <form>
                <div className="nomprenom">
                  <div className="colonne">
                    <label id="labelnom" htmlFor="nom">
                      Nom :
                    </label>
                    <input
                      type="text"
                      id="nom"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Nom"
                    />
                  </div>
                  <div className="colonne">
                    <label id="labelprenom" htmlFor="prenom">
                      Prénom :
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Prénom"
                    />
                  </div>
                </div>
                <div className="colonne">
                  <label id="labelEmail" htmlFor="email">
                    Email :
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse mail"
                  />
                </div>

                <div className="chgmt">
                  <h3>Changement de mot de passe</h3>
                </div>
                <div className="motsDP">
                  <div className="colonne">
                    <p>Mot de passe actuel :</p>
                    <div className="input">
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="colonne">
                    <p>Nouveau mot de passe :</p>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="btnConfirmer">
                  <button onClick={handleChangePassword}>Confirmer</button>
                </div>
                <p className="password-message">{passwordMessage}</p>
              </form>
            </div>
        </div>
      <div className="formulaireResponsive">
        <div className="profile-info">
          <h3>Mes informations</h3>
          <form>
            <div className="nomprenom">
              <div className="colonne">
                <label id="labelnom" htmlFor="nom">
                  Nom :
                </label>
                <input
                  className="input"
                  type="text"
                  id="nom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Prenom"
                />
              </div>
              <div className="colonne">
                <label id="labelprenom" htmlFor="prenom">
                  Prénom :
                </label>
                <input
                  type="text"
                  id="prenom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="prenom"
                />
              </div>
            </div>
            <div className="colonne">
              <label id="labelEmail" htmlFor="email">
                Email :
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre mail"
              />
            </div>

            <h3 className="chgmt">Changement de mot de passe</h3>
            <div className="motsDP">
              <div className="colonne">
                <p>Mot de passe actuel :</p>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="colonne">
                <p>Nouveau mot de passe :</p>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="btnConfirmer">
              <button onClick={handleChangePassword}>Confirmer</button>
            </div>
            <p className="password-message">{passwordMessage}</p>
          </form>
      </div>
    </div>
    )
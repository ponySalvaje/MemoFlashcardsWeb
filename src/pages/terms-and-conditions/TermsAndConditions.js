import { Row, Col, Card } from "react-bootstrap";
import mainLogo from "../../assets/logo/logo_main_color.png";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <Row className="justify-content-center pt-4 terms-conditions-row">
      <Col xs={12} md={6}>
        <div>
          <a className="d-flex justify-content-center mb-4" href="/">
            <img alt="Logo Memo" src={mainLogo} width={64} height={64} />
          </a>
        </div>
        <Card className="shadow-sm mb-4">
          <Card.Body className="terms-conditions-body">
            <p className="text-center">
              <strong>
                <u>Política de Privacidad de Tratamiento de Datos</u>
              </strong>
            </p>
            <article>
              <ol type="I" start="1">
                <li>Objetivo</li>
              </ol>
              <p align="justify">
                <b>Memo flashcards</b>, realiza el tratamiento de los datos
                personales que recopila a través de la página web
                https://memoflashcards.com (la "<b>Página Web</b>
                "), mediante la cual se realiza la obtención de los
                consentimientos informados de tratamiento de datos personales
              </p>
            </article>
            <article>
              <ol type="I" start="2">
                <li>Marco Normativo y Banco de Datos Personales</li>
              </ol>
              <div align="justify">
                <p>
                  Esta Política de Privacidad se encuentra regulada por la
                  legislación peruana en materia de protección de datos
                  personales (el "Marco Normativo"):
                </p>
                <ul>
                  <li>
                    Ley No. 29733, Ley de Protección de Datos Personales (la
                    "Ley").
                  </li>
                  <li>
                    Decreto Supremo No. 003-2013-JUS, que aprueba el Reglamento
                    de la Ley No. 29733 (el "Reglamento").
                  </li>
                  <li>
                    Directiva de Seguridad de la información, aprobada por la
                    Resolución Directoral Nº 019-2013- JUS/DGPDP.
                  </li>
                </ul>
                <p>
                  La información, que contiene datos personales proporcionados
                  por sus participantes (el "<strong>Participante</strong>" o
                  los "<strong>Participantes</strong>", según corresponda) a
                  través del formulario de registro, será almacenada en el Banco
                  de Datos Personales de "<strong>Memo</strong>" de Intercorp
                  Management, en cumplimiento de la Ley y el Reglamento. El
                  usuario puede eliminar su cuenta desde la pantalla de perfil
                  en la aplicación para dispositivos móviles o en la web
                  solicitando la eliminación de la cuenta a un administrador al
                  correo memoflashcard.correo@gmail.com.
                </p>
              </div>
            </article>
            <article>
              <ol type="I" start="3">
                <li>Datos personales a tratar</li>
              </ol>
              <p align="justify">
                Para cumplir con los objetivos de esta Política de Privacidad,
                es obligatorio que el Participante proporcione los siguientes
                datos personales en el formulario: Nombres, apellidos, correo
                electrónico, universidad y año de estudio (en rangos). Estos
                datos son visibles solo en el portal de administración por
                usuarios autorizados para fines de mantenimiento (Mejorar cuenta
                a premium de manera manual, eliminación de cuenta, etc.).
              </p>
            </article>
            <article>
              <ol type="I" start="4">
                <li>Finalidad</li>
              </ol>
              <p align="justify">
                Los datos personales y del negocio proporcionados por el
                Participante serán tratados por Memo para: (i) gestionar el
                registro de los Participantes que utilizan los servicios que
                ofrece "Memo flashcards"; (ii) el planeamiento, desarrollo,
                promoción y ejecución del plan de publicidad de Memo.
              </p>
            </article>
            <article>
              <ol type="I" start="5">
                <li>Plazos de conservación</li>
              </ol>
              <p align="justify">
                Los datos personales y del negocio se conservarán mientras sean
                necesarios para cumplir con la finalidad por la cual fueron
                recopilados o hasta que el Participante revoque. Los datos
                recopilados no se eliminan automáticamente; el usuario puede
                solicitar la eliminación a través del correo
                memoflashcard.correo@gmail.com o directamente desde la
                aplicación móvil en el botón "ELIMINAR CUENTA".
              </p>
            </article>
            <article>
              <ol type="I" start="6">
                <li>Transferencia y destinatarios</li>
              </ol>
              <p align="justify">
                Los datos personales se comparten con la nube de la empresa
                Amazon Web Services ubicada en Paseo Castellana, 259 A, Torre
                Foster, planta 11, 28046 Madrid (Madrid) - España, almacenados
                en un servicio de base de datos Cloud. Memo no tiene la
                intención de comercializar ni transferir información de datos
                personales proporcionados por ningún Participante.
              </p>
            </article>
            <article>
              <ol type="I" start="7">
                <li>Resguardo de la información</li>
              </ol>
              <p align="justify">
                Memo ha implementado medidas de seguridad necesarias para
                garantizar la protección de los datos personales y del negocio
                proporcionados por el Participante, evitando alteraciones,
                pérdidas, accesos o procesamientos no autorizados por terceros.
                Estas medidas buscan preservar la información personal contra
                cualquier amenaza o acceso no autorizado.
              </p>
            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TermsAndConditions;

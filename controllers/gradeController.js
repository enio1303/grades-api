import { db } from "../models/index.js";
import { logger } from "../config/logger.js";
import { gradeModel } from "../models/gradeModel.js";

const create = async (req, res) => {
  try {
    const grade = new gradeModel(req.body);
    grade.lastModified = new Date();
    await grade.save();
    res.send();
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const grades = await gradeModel.find(condition);
    const gradesModifiedId = grades.map((grade) => {
      return {
        id: grade._id,
        name: grade.name,
        subject: grade.subject,
        type: grade.type,
        value: grade.value,
        lastmodified: grade.lastModified,
      };
    });
    res.send(gradesModifiedId);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const grade = await gradeModel.findOne({ _id: id });
    const gradeModifiedId = {
      id: grade._id,
      name: grade.name,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      lastmodified: grade.lastModified,
    };
    res.send(gradeModifiedId);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;
  const filter = { _id: id };
  const update = req.body;
  update.lastModified = new Date();

  try {
    let newAccount = await gradeModel.findOneAndUpdate(filter, update, {
      runValidators: true,
      useFindAndModify: false,
    });

    res.send({ message: "Grade atualizado com sucesso" });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await gradeModel.findOneAndDelete({ _id: id });

    res.send({ message: "Grade excluido com sucesso" });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {

    await gradeModel.remove({});

    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };

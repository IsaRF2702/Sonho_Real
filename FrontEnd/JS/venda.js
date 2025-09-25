document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Upload + Preview de múltiplas imagens
  // ===============================
  const fileInput = document.getElementById('imgUpload');
  const imgPreview = document.getElementById('imgPreview');
  const thumbnails = document.getElementById('thumbnails');
  const placeholderText = document.getElementById('placeholderText');

  if (!fileInput || !imgPreview || !thumbnails) {
    console.error("❌ Elementos de upload não encontrados no HTML");
    return;
  }

  fileInput.addEventListener('change', function () {
    const files = Array.from(this.files);
    if (!files.length) return;

    // Primeira imagem vira a principal
    imgPreview.src = URL.createObjectURL(files[0]);
    imgPreview.style.display = "block";
    placeholderText.style.display = "none";

    // Limpa miniaturas
    thumbnails.innerHTML = '';
    files.forEach((file, index) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.addEventListener('click', () => {
        imgPreview.src = img.src;
        document.querySelectorAll('#thumbnails img').forEach(i => i.classList.remove('active'));
        img.classList.add('active');
      });
      if (index === 0) img.classList.add('active');
      thumbnails.appendChild(img);
    });
  });

  // ===============================
  // Publicar anúncio
  // ===============================
  window.publicar = async function() {
    const nome_casa     = document.querySelector('.titulo')?.innerText || "";
    const tipo_moradia  = document.querySelector('.tipo_moradia')?.innerText || "";
    const finalidade    = document.querySelector('.finalidade')?.innerText || "";
    const preco         = document.querySelector('.preco')?.innerText || "";
    const rua           = document.querySelector('.rua')?.innerText || "";
    const bairro        = document.querySelector('.bairro')?.innerText || "";
    const numero        = document.querySelector('.numero')?.innerText || "";
    const cep           = document.querySelector('.cep')?.innerText || "";
    const area_total    = document.querySelector('.area_total')?.innerText || "";
    const quartos       = document.querySelector('.quartos')?.innerText || "";
    const banheiros     = document.querySelector('.banheiros')?.innerText || "";
    const vagas_garagem = document.querySelector('.vagas_garagem')?.innerText || "";

    const formData = new FormData();
    formData.append("nome_casa", nome_casa);
    formData.append("tipo_moradia", tipo_moradia);
    formData.append("finalidade", finalidade);
    formData.append("preco", preco);
    formData.append("rua", rua);
    formData.append("bairro", bairro);
    formData.append("numero", numero);
    formData.append("cep", cep);
    formData.append("area_total", area_total);
    formData.append("quartos", quartos);
    formData.append("banheiros", banheiros);
    formData.append("vagas_garagem", vagas_garagem);

    // Adiciona as imagens
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("imagens", files[i]);
    }

    try {
      const response = await fetch("http://192.168.1.4:3000/Imovel/cadastrar", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Erro ao publicar anúncio");

      const data = await response.json();
      console.log("✅ Anúncio publicado:", data);
      alert("Anúncio publicado com sucesso!");
    } catch (error) {
      console.error("❌ Erro:", error);
      alert("Erro ao publicar anúncio. Veja o console.");
    }
  }

  // ===============================
  // Ativar/Desativar botões
  // ===============================
  window.toggleAtivo = function(btn) {
    btn.classList.toggle("ativo");
  }

  // ===============================
  // Expandir/ocultar seções
  // ===============================
  window.toggleSection = function(header) {
    const section = header.parentElement;
    const tags = section.querySelector(".tags");
    const toggleIcon = header.querySelector(".toggle");
    
    if (tags.style.display === "none" || tags.style.display === "") {
      tags.style.display = "flex";
      toggleIcon.textContent = "▼";
    } else {
      tags.style.display = "none";
      toggleIcon.textContent = "▲";
    }
  }
});

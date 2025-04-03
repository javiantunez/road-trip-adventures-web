
document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const menuButton = document.getElementById('menuButton');
  const menuIcon = document.getElementById('menuIcon');
  const mobileNav = document.getElementById('mobileNav');
  const inscripcionForm = document.getElementById('inscripcionForm');
  const llevaAcompananteCheckbox = document.getElementById('llevaAcompanante');
  const acompananteSection = document.getElementById('acompananteSection');
  const submitBtn = document.getElementById('submitBtn');

  // Toggle mobile menu
  if (menuButton) {
    menuButton.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      if (mobileNav.classList.contains('active')) {
        menuIcon.className = 'icon icon-close';
        menuIcon.textContent = '✕';
      } else {
        menuIcon.className = 'icon icon-menu';
        menuIcon.textContent = '☰';
      }
    });
  }

  // Toggle acompañante section
  if (llevaAcompananteCheckbox) {
    llevaAcompananteCheckbox.addEventListener('change', function() {
      if (this.checked) {
        acompananteSection.classList.add('active');
        // Hacer los campos obligatorios
        document.querySelectorAll('#acompananteSection input').forEach(input => {
          if (!input.name.includes('sexo') && !input.name.includes('tallaCamiseta')) {
            input.required = true;
          }
        });
      } else {
        acompananteSection.classList.remove('active');
        // Quitar obligatoriedad de los campos
        document.querySelectorAll('#acompananteSection input').forEach(input => {
          input.required = false;
        });
      }
    });
  }

  // Form validation
  function validateForm() {
    let isValid = true;
    const mandatoryFields = document.querySelectorAll('input[required], select[required]');
    
    // Limpiar mensajes de error previos
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });
    
    // Validar campos obligatorios
    mandatoryFields.forEach(field => {
      const errorElement = document.getElementById(`${field.id}Error`);
      if (!field.value.trim()) {
        if (errorElement) {
          errorElement.textContent = 'Este campo es obligatorio';
        }
        isValid = false;
      }
    });
    
    // Validar formato de email
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    if (emailInput && emailInput.value && !validateEmail(emailInput.value)) {
      if (emailError) {
        emailError.textContent = 'Email inválido';
      }
      isValid = false;
    }
    
    // Validar formato DNI
    const dniInput = document.getElementById('dni');
    const dniError = document.getElementById('dniError');
    if (dniInput && dniInput.value && !validateDNI(dniInput.value)) {
      if (dniError) {
        dniError.textContent = 'DNI/NIE inválido';
      }
      isValid = false;
    }
    
    // Validar teléfono
    const telefonoInput = document.getElementById('telefono');
    const telefonoError = document.getElementById('telefonoError');
    if (telefonoInput && telefonoInput.value && !validatePhone(telefonoInput.value)) {
      if (telefonoError) {
        telefonoError.textContent = 'Teléfono inválido';
      }
      isValid = false;
    }
    
    // Validar campos del acompañante si está seleccionado
    if (llevaAcompananteCheckbox && llevaAcompananteCheckbox.checked) {
      const acompananteFields = [
        { id: 'nombreAcompanante', error: 'nombreAcompananteError' },
        { id: 'apellidosAcompanante', error: 'apellidosAcompananteError' },
        { id: 'dniAcompanante', error: 'dniAcompananteError' },
        { id: 'telefonoAcompanante', error: 'telefonoAcompananteError' },
        { id: 'emailAcompanante', error: 'emailAcompananteError' }
      ];
      
      acompananteFields.forEach(field => {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.error);
        
        if (input && !input.value.trim()) {
          if (error) {
            error.textContent = 'Este campo es obligatorio';
          }
          isValid = false;
        }
      });
      
      // Validar email del acompañante
      const emailAcompanante = document.getElementById('emailAcompanante');
      const emailAcompananteError = document.getElementById('emailAcompananteError');
      if (emailAcompanante && emailAcompanante.value && !validateEmail(emailAcompanante.value)) {
        if (emailAcompananteError) {
          emailAcompananteError.textContent = 'Email inválido';
        }
        isValid = false;
      }
      
      // Validar DNI del acompañante
      const dniAcompanante = document.getElementById('dniAcompanante');
      const dniAcompananteError = document.getElementById('dniAcompananteError');
      if (dniAcompanante && dniAcompanante.value && !validateDNI(dniAcompanante.value)) {
        if (dniAcompananteError) {
          dniAcompananteError.textContent = 'DNI/NIE inválido';
        }
        isValid = false;
      }
      
      // Validar teléfono del acompañante
      const telefonoAcompanante = document.getElementById('telefonoAcompanante');
      const telefonoAcompananteError = document.getElementById('telefonoAcompananteError');
      if (telefonoAcompanante && telefonoAcompanante.value && !validatePhone(telefonoAcompanante.value)) {
        if (telefonoAcompananteError) {
          telefonoAcompananteError.textContent = 'Teléfono inválido';
        }
        isValid = false;
      }
    }
    
    // Validar selección de roadbook
    const roadbookSelected = document.querySelector('input[name="tipoRoadbook"]:checked');
    const roadbookError = document.getElementById('tipoRoadbookError');
    if (!roadbookSelected) {
      if (roadbookError) {
        roadbookError.textContent = 'Selecciona un tipo de roadbook';
      }
      isValid = false;
    }
    
    return isValid;
  }
  
  // Helper functions for validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validateDNI(dni) {
    const re = /^[0-9]{8}[A-Za-z]$|^[XYZxyz][0-9]{7}[A-Za-z]$/;
    return re.test(dni);
  }
  
  function validatePhone(phone) {
    const re = /^[0-9]{9}$/;
    return re.test(phone);
  }
  
  // Handle form submission
  if (inscripcionForm) {
    inscripcionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm()) {
        // Mostrar mensaje de carga
        submitBtn.disabled = true;
        submitBtn.textContent = 'Procesando...';
        
        // Recopilar datos del formulario
        const formData = new FormData(inscripcionForm);
        const formDataObject = {};
        
        // Convertir FormData a objeto JSON
        formData.forEach((value, key) => {
          // Manejar los campos del acompañante
          if (key.includes('.')) {
            const [parent, child] = key.split('.');
            if (!formDataObject[parent]) {
              formDataObject[parent] = {};
            }
            formDataObject[parent][child] = value;
          } 
          // Manejar checkboxes múltiples (accesorios)
          else if (key === 'accesorios') {
            if (!formDataObject[key]) {
              formDataObject[key] = [];
            }
            formDataObject[key].push(value);
          }
          // Resto de campos
          else {
            formDataObject[key] = value;
          }
        });
        
        // Añadir información del evento
        formDataObject.evento = {
          id: "cantabria-challenge-2023",
          title: "III Cantabria Challenge",
          date: "11-12 Abril, 2023",
          location: "Hoznayo, Cantabria",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
        };
        
        // Aquí puedes enviar los datos a PHP o guardarlos en localStorage/sessionStorage
        console.log('Datos del formulario:', formDataObject);
        
        // Guardar en sessionStorage para usar en la siguiente página
        sessionStorage.setItem('inscripcionData', JSON.stringify(formDataObject));
        
        // Simular envío y redirección
        setTimeout(() => {
          // Aquí puedes enviar a un archivo PHP mediante fetch o redirigir
          // window.location.href = 'checkout.php?id=cantabria-challenge-2023';
          
          // Para pruebas, simplemente mostramos un alert
          alert('¡Formulario enviado correctamente! Redirección al checkout...');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Continuar al checkout';
          
          // Opcional: Redireccionar a checkout.html
          // window.location.href = 'checkout.html';
        }, 1500);
      } else {
        // Scroll to first error
        const firstError = document.querySelector('.error-message:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }
});
